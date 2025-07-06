import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authServices'

export default function Login() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const handleLogin = async (data) => {
        try {
            const response = await login(data)
            console.log(response)
            if (response?.token) {
                sessionStorage.setItem('apiToken', response.token)
                navigate('/dashboard')
            } else {
                alert("Acceso denegado")
            }
        } catch (error) {
            console.log("Ocurrió un error durante el inicio de sesión", error)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-700">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-2 flex items-center justify-center gap-2">
                    <i className="fas fa-sign-in-alt"></i>
                    Accede a tu cuenta
                </h1>
                <p className="text-center text-sm text-gray-600 mb-6">
                    Usa tus credenciales registradas para continuar
                </p>

                <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-medium mb-1"
                        >
                            Dirección de correo
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="fas fa-envelope"></i>
                            </span>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="tucorreo@dominio.com"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-medium mb-1"
                            >
                                Clave de acceso
                            </label>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                                ¿Has olvidado la clave?
                            </a>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="fas fa-lock"></i>
                            </span>
                            <input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="remember"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                            Recordar mis datos
                        </label>
                    </div>

                    <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 rounded-md transition-colors cursor-pointer"
                    >
                    <i className="fas fa-sign-in-alt"></i>
                    Acceder
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600 mt-6">
                    ¿Tienes inconvenientes?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Escríbenos
                    </a>
                </div>

                <div className="text-center text-xs text-gray-400 mt-4">
                    <i className="fas fa-shield-alt mr-1"></i> Plataforma protegida. Tus credenciales están seguras.
                </div>
            </div>
        </div>
    )
}
