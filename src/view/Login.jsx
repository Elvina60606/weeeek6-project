import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const { VITE_URL } = import.meta.env;

const Login =() => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isValid},
    } = useForm ({
        mode: 'onChange',
        defaultValues: {
            username: 'example@gmail.tw',
            password: '****',
        }
    });

    const onSubmit = async(formData) =>{
        try {
            const response = await axios.post(`${VITE_URL}/v2/admin/signin`, formData )
            const { token, expired } = response.data;
            document.cookie = `reactToken=${token}; expires=${new Date(expired)};`;
            axios.defaults.headers.common['Authorization'] = token;

            setTimeout(() => {
                navigate('/admin/product', { replace: true,})
                }, 2000);
            }            
        catch (error) {
            console.log("登入帳號：", error)
        }
    }

    return (
        <>
        <div className="container d-flex flex-column justify-content-center align-items-center my-5">
            <h4 className="mb-3">請先登入</h4>
            <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3">
                    <input type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        {...register('username', {
                                required: '請輸入email',
                                pattern:{
                                    value: /^\S+@\S+$/i,
                                    message: '*請輸入正確的email格式'
                                }
                        })}/>
                    <label htmlFor="floatingInput">Email address</label>
                    {errors.email && (
                        <p className="text-danger mt-2 mb-0">{errors.email.message}</p>
                    )}
                </div>
                <div className="form-floating">
                    <input type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        {...register('password', {
                                required: '請輸入密碼',
                                minLength: {
                                    value: 8,
                                    message: '密碼最少爲 8 碼'
                                },
                                maxLength: {
                                    value: 16,
                                    message: '密碼最多爲 16 碼'
                                }
                        })}/>
                    <label htmlFor="floatingPassword">Password</label>
                    {
                        errors.password && (
                            <p className="text-danger mt-2 mb-0">{errors.password.message}</p>
                        )
                    }
                </div>
                <button type="submit" 
                        className="btn btn-primary my-4"
                        disabled={!isValid}>
                        登入
                </button>
            </form>
        </div>
        </>
    )
}

export default Login;