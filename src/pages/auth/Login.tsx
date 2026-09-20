import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Landmark,
  Presentation,
  GraduationCap,
  ArrowRight,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  HelpCircle,
  Check
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UserRole } from '../../types/user';
import { UtlaLogo } from '../../components/common/UtlaLogo';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [username, setUsername] = useState('j.lopez@myutla.org');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const roleCardSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'STUDENT') {
      setUsername('j.lopez@myutla.org');
    } else if (role === 'TEACHER') {
      setUsername('juan.perez@docentes.myutla.org');
    } else if (role === 'ADMIN') {
      setUsername('rectoria@myutla.org');
    }
  };

  const handleDirectRoleLogin = (role: UserRole) => {
    setSelectedRole(role);
    setIsLoading(true);
    setTimeout(() => {
      login(role);
      if (role === 'STUDENT') navigate('/student');
      else if (role === 'TEACHER') navigate('/teacher');
      else if (role === 'ADMIN') navigate('/admin');
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, username);
      if (selectedRole === 'STUDENT') navigate('/student');
      else if (selectedRole === 'TEACHER') navigate('/teacher');
      else if (selectedRole === 'ADMIN') navigate('/admin');
    }, 500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-4 bg-[#0F2042]/95 border border-utla-navy-light/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Institutional Identity & Role Selection Cards */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-utla-navy-light/60">
          <div>
            {/* Institution Brand */}
            <div className="flex items-start gap-4">
              <UtlaLogo size="lg" showText={true} textColor="white" subtextColor="gold" />
            </div>

            {/* Portal Banner */}
            <div className="mt-8 mb-6">
              <div className="inline-block bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-utla-navy-deep px-5 py-2 rounded-lg font-black text-2xl tracking-wider shadow-lg">
                PORTAL: myutla.org
              </div>
            </div>

            {/* Role Selection Section */}
            <div className="mt-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-utla-navy-light" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-300">
                  SELECCIONA TU ROL
                </span>
                <div className="h-[1px] flex-1 bg-utla-navy-light" />
              </div>

              {/* 3 Role Cards matching mockup 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. ADMINISTRACIÓN */}
                <div
                  onClick={() => roleCardSelect('ADMIN')}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between text-center ${
                    selectedRole === 'ADMIN'
                      ? 'bg-white text-slate-900 border-utla-gold ring-2 ring-utla-gold shadow-xl scale-[1.02]'
                      : 'bg-white/95 text-slate-800 border-slate-200 hover:bg-white hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-utla-navy/10 flex items-center justify-center text-utla-navy mb-3">
                      <Landmark className="w-7 h-7" />
                    </div>
                    <h3 className="font-extrabold text-sm tracking-wide text-utla-navy uppercase">
                      ADMINISTRACIÓN
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                      Gestiona instituciones, usuarios, cursos, reportes y más.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectRoleLogin('ADMIN');
                    }}
                    className="mt-4 w-full py-2 bg-utla-navy text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-utla-navy-light transition-colors"
                  >
                    <span>Entrar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 2. PROFESORES */}
                <div
                  onClick={() => roleCardSelect('TEACHER')}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between text-center ${
                    selectedRole === 'TEACHER'
                      ? 'bg-white text-slate-900 border-utla-gold ring-2 ring-utla-gold shadow-xl scale-[1.02]'
                      : 'bg-white/95 text-slate-800 border-slate-200 hover:bg-white hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-700 mb-3">
                      <Presentation className="w-7 h-7" />
                    </div>
                    <h3 className="font-extrabold text-sm tracking-wide text-amber-800 uppercase">
                      PROFESORES
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                      Gestiona clases, estudiantes, calificaciones y contenido del curso.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectRoleLogin('TEACHER');
                    }}
                    className="mt-4 w-full py-2 bg-[#C5A859] text-utla-navy-deep rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
                  >
                    <span>Entrar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 3. ESTUDIANTES */}
                <div
                  onClick={() => roleCardSelect('STUDENT')}
                  className={`cursor-pointer rounded-xl p-4 transition-all duration-200 border flex flex-col justify-between text-center ${
                    selectedRole === 'STUDENT'
                      ? 'bg-white text-slate-900 border-utla-gold ring-2 ring-utla-gold shadow-xl scale-[1.02]'
                      : 'bg-white/95 text-slate-800 border-slate-200 hover:bg-white hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-blue-900/10 flex items-center justify-center text-blue-900 mb-3">
                      <GraduationCap className="w-7 h-7" />
                    </div>
                    <h3 className="font-extrabold text-sm tracking-wide text-utla-navy uppercase">
                      ESTUDIANTES
                    </h3>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                      Accede a tus cursos, tareas, calificaciones y recursos.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDirectRoleLogin('STUDENT');
                    }}
                    className="mt-4 w-full py-2 bg-utla-navy text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-utla-navy-light transition-colors"
                  >
                    <span>Entrar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-utla-navy-light/40 flex items-center justify-between text-xs text-slate-300">
            <span>Rol seleccionado actualmente:</span>
            <span className="font-bold text-utla-gold uppercase px-2 py-0.5 rounded bg-utla-navy-dark">
              {selectedRole}
            </span>
          </div>
        </div>

        {/* Right Side: Login Form matching mockup 1 */}
        <div className="lg:col-span-5 p-6 sm:p-10 bg-white text-slate-900 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            {/* Form Title */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-8 bg-slate-300" />
                <h2 className="text-lg sm:text-xl font-black text-utla-navy tracking-tight uppercase font-serif">
                  BIENVENIDO A UTLA
                </h2>
                <div className="h-[1px] w-8 bg-slate-300" />
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Inicia sesión para continuar con tu cuenta
              </p>
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center mx-auto mt-3 text-utla-navy">
                <ShieldCheck className="w-4 h-4 text-utla-navy" />
              </div>
            </div>

            {/* Active role badge */}
            <div className="mb-4 text-center">
              <span className="inline-block px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
                Accediendo como:{' '}
                <strong className="text-utla-navy">
                  {selectedRole === 'STUDENT' ? 'Estudiante' : selectedRole === 'TEACHER' ? 'Profesor' : 'Administrador'}
                </strong>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  NOMBRE DE USUARIO
                </label>
                <div className="relative rounded-lg border border-slate-300 focus-within:border-utla-navy focus-within:ring-2 focus-within:ring-utla-navy/20 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingresa tu nombre de usuario"
                    className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  CONTRASEÑA
                </label>
                <div className="relative rounded-lg border border-slate-300 focus-within:border-utla-navy focus-within:ring-2 focus-within:ring-utla-navy/20 transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg focus:outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-utla-navy rounded border-slate-300 focus:ring-utla-navy"
                  />
                  <span>Recordarme</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Por favor contacte a Soporte Técnico UTLA para restablecer su contraseña institucional.')}
                  className="text-utla-navy hover:underline font-semibold"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-utla-navy hover:bg-utla-navy-light text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>INICIAR SESIÓN</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="h-[1px] flex-1 bg-slate-200" />
              <span className="text-xs uppercase text-slate-400 font-bold">O</span>
              <div className="h-[1px] flex-1 bg-slate-200" />
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={() => handleDirectRoleLogin(selectedRole)}
              className="w-full py-2.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Iniciar sesión con Google</span>
            </button>

            {/* Create Account Link */}
            <div className="mt-5 text-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-xs font-bold text-utla-navy hover:text-utla-navy-light hover:underline py-1.5 px-3 rounded-lg bg-blue-50 border border-blue-100"
              >
                <span>¿Nuevo usuario? Crear cuenta</span>
              </Link>
            </div>

            {/* Support Link */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => alert('Soporte Técnico UTLA\nEmail: soporte@myutla.org\nWhatsApp: +1 (555) 019-2831')}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 mx-auto"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>¿Necesitas ayuda? Contacta a Soporte Técnico</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
