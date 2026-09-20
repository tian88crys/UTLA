import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Globe,
  Radio as RadioIcon,
  Tv,
  Church,
  Users,
  MoreHorizontal,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  BookOpen,
  Calendar
} from 'lucide-react';
import { StudentRegistrationData } from '../../types/registration';
import { UtlaLogo } from '../../components/common/UtlaLogo';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<StudentRegistrationData>({
    payNow: true,
    registrationFee: 50.0,
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Masculino',
    birthDay: '15',
    birthMonth: 'Mayo',
    birthYear: '1995',
    educationLevel: 'Secundaria / Bachillerato',
    phone: '',
    mobilePhone: '',
    address: '',
    country: 'Estados Unidos',
    stateProvince: 'California',
    city: 'Los Angeles',
    postalCode: '90001',
    churchName: '',
    pastorName: '',
    churchAddress: '',
    churchCityZip: '',
    ministerialRole: 'Líder de Jóvenes / Servidor',
    testimonialEssay: '',
    referralSource: 'Internet - Social Media',
  });

  const handleChange = (field: keyof StudentRegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email) {
        alert('Por favor complete los campos obligatorios (*).');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Top Header matching Mockup 2 */}
      <div className="bg-utla-navy text-white px-6 py-6 border-b-2 border-utla-gold flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <UtlaLogo size="md" showText={true} textColor="white" subtextColor="gold" />
          <div className="hidden sm:block border-l border-slate-600 pl-4">
            <h1 className="text-lg font-black tracking-wide text-white uppercase font-serif">
              NUEVO USUARIO
            </h1>
            <p className="text-xs text-slate-300">
              Crea tu cuenta para comenzar tu formación teológica
            </p>
          </div>
        </div>

        {/* 3 Step Wizard Stepper */}
        <div className="flex items-center gap-2 sm:gap-4 select-none">
          {/* Step 1 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep >= 1
                  ? 'bg-utla-gold text-utla-navy font-black ring-2 ring-utla-gold/50'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              1
            </div>
            <span
              className={`text-xs font-semibold hidden md:inline ${
                currentStep === 1 ? 'text-utla-gold font-bold' : 'text-slate-300'
              }`}
            >
              Información
            </span>
          </div>

          <div className="w-8 h-[2px] bg-slate-600" />

          {/* Step 2 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep >= 2
                  ? 'bg-utla-gold text-utla-navy font-black ring-2 ring-utla-gold/50'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              2
            </div>
            <span
              className={`text-xs font-semibold hidden md:inline ${
                currentStep === 2 ? 'text-utla-gold font-bold' : 'text-slate-400'
              }`}
            >
              Confirmación
            </span>
          </div>

          <div className="w-8 h-[2px] bg-slate-600" />

          {/* Step 3 */}
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                currentStep === 3
                  ? 'bg-emerald-500 text-white font-black'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              3
            </div>
            <span
              className={`text-xs font-semibold hidden md:inline ${
                currentStep === 3 ? 'text-emerald-400 font-bold' : 'text-slate-400'
              }`}
            >
              Completado
            </span>
          </div>
        </div>
      </div>

      {/* Payment Option Toggle Banner matching mockup 2 */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase text-slate-800 tracking-wider">
            *COSTO DE REGISTRACIÓN:
          </span>
          <span className="text-base font-black text-utla-navy bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
            ${formData.registrationFee.toFixed(2)} USD
          </span>
        </div>

        {/* Radio pill buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleChange('payNow', true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              formData.payNow
                ? 'bg-utla-gold text-utla-navy shadow-md ring-2 ring-utla-gold/50'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                formData.payNow ? 'border-utla-navy bg-utla-navy' : 'border-slate-400'
              }`}
            >
              {formData.payNow && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span>Pagar Registración ahora</span>
          </button>

          <button
            type="button"
            onClick={() => handleChange('payNow', false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !formData.payNow
                ? 'bg-utla-navy text-white shadow-md ring-2 ring-utla-navy/50'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                !formData.payNow ? 'border-white bg-white' : 'border-slate-400'
              }`}
            >
              {!formData.payNow && <div className="w-1.5 h-1.5 rounded-full bg-utla-navy" />}
            </div>
            <span>Pagar Registración después</span>
          </button>
        </div>
      </div>

      {/* Main Step Content */}
      <div className="p-6 sm:p-8">
        {currentStep === 1 && (
          <form onSubmit={handleNext} className="space-y-8">
            {/* 1. INFORMACIÓN PERSONAL */}
            <div>
              <div className="border-b border-slate-200 pb-2 mb-5 flex items-center gap-2">
                <User className="w-4 h-4 text-utla-gold" />
                <h2 className="text-sm font-black uppercase text-utla-navy tracking-wider">
                  INFORMACIÓN PERSONAL:
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Nombre Completo */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Nombre Completo:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="Ingrese su nombre completo"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-utla-navy focus:outline-none"
                  />
                </div>

                {/* Correo Electrónico */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Correo Electrónico:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-utla-navy focus:outline-none"
                  />
                </div>

                {/* Contraseña */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Contraseña:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="Ingrese su contraseña"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-utla-navy focus:outline-none pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Confirmar Contraseña */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Confirmar Contraseña:
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="Confirme su contraseña"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-utla-navy focus:outline-none pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Género */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Género:
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-utla-navy bg-white"
                  >
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>

                {/* Fecha de Nacimiento */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Fecha de Nacimiento:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={formData.birthDay}
                      onChange={(e) => handleChange('birthDay', e.target.value)}
                      className="px-2 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => handleChange('birthMonth', e.target.value)}
                      className="px-2 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={formData.birthYear}
                      onChange={(e) => handleChange('birthYear', e.target.value)}
                      className="px-2 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                    >
                      {Array.from({ length: 60 }, (_, i) => 2008 - i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Nivel de Estudios */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Nivel de Estudios:
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) => handleChange('educationLevel', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-utla-navy bg-white"
                  >
                    <option value="Secundaria / Bachillerato">Secundaria / Bachillerato</option>
                    <option value="Técnico Superior">Técnico Superior</option>
                    <option value="Licenciatura / Pregrado">Licenciatura / Pregrado</option>
                    <option value="Maestría / Posgrado">Maestría / Posgrado</option>
                    <option value="Doctorado">Doctorado</option>
                  </select>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Teléfono:
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Ej. 555-987-6543"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Teléfono Celular */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Teléfono Celular:
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobilePhone}
                    onChange={(e) => handleChange('mobilePhone', e.target.value)}
                    placeholder="Ej. 555-123-4567"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Dirección */}
                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Dirección:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Ingrese su dirección completa"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                {/* País */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Estudiante País:
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Estados Unidos">Estados Unidos</option>
                    <option value="México">México</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                {/* Estado/Provincia */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Estado/Provincia:
                  </label>
                  <input
                    type="text"
                    value={formData.stateProvince}
                    onChange={(e) => handleChange('stateProvince', e.target.value)}
                    placeholder="Seleccione Estado/Provincia"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                {/* Ciudad */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Ciudad:
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Seleccione Ciudad"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    *Si la ciudad no está en la lista, seleccione "Otra"
                  </span>
                </div>

                {/* Código Postal */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Código Postal:
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    placeholder="Ingrese el código postal"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* 2. INFORMACIÓN MINISTERIAL */}
            <div>
              <div className="border-b border-slate-200 pb-2 mb-5 flex items-center gap-2">
                <Church className="w-4 h-4 text-utla-gold" />
                <h2 className="text-sm font-black uppercase text-utla-navy tracking-wider">
                  INFORMACIÓN MINISTERIAL:
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    *Iglesia:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.churchName}
                    onChange={(e) => handleChange('churchName', e.target.value)}
                    placeholder="Nombre de su iglesia"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Pastor:
                  </label>
                  <input
                    type="text"
                    value={formData.pastorName}
                    onChange={(e) => handleChange('pastorName', e.target.value)}
                    placeholder="Nombre de su pastor"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Dirección de Iglesia:
                  </label>
                  <input
                    type="text"
                    value={formData.churchAddress}
                    onChange={(e) => handleChange('churchAddress', e.target.value)}
                    placeholder="Dirección completa de su iglesia"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Ciudad, Código Postal de Iglesia:
                  </label>
                  <input
                    type="text"
                    value={formData.churchCityZip}
                    onChange={(e) => handleChange('churchCityZip', e.target.value)}
                    placeholder="Ciudad, Código Postal"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Ocupación Ministerial:
                  </label>
                  <select
                    value={formData.ministerialRole}
                    onChange={(e) => handleChange('ministerialRole', e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
                  >
                    <option value="Pastor Principal">Pastor Principal</option>
                    <option value="Pastor Asociado">Pastor Asociado</option>
                    <option value="Líder de Jóvenes / Servidor">Líder de Jóvenes / Servidor</option>
                    <option value="Maestro de Escuela Dominical">Maestro de Escuela Dominical</option>
                    <option value="Misionero / Evangelista">Misionero / Evangelista</option>
                    <option value="Diácono / Anciano">Diácono / Anciano</option>
                    <option value="Miembro Activo / En Discipulado">Miembro Activo / En Discipulado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. RESEÑA MINISTERIAL Y TESTIMONIO */}
            <div>
              <div className="border-b border-slate-200 pb-2 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-utla-gold" />
                <h2 className="text-sm font-black uppercase text-utla-navy tracking-wider">
                  RESEÑA MINISTERIAL:
                </h2>
              </div>
              <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                Brevemente escriba su testimonio y experiencia ministerial. ¿Cuándo aceptó a Jesucristo como su Señor y Salvador? Los ministerios que ha desempeñado en su iglesia. Brevemente describa sus estudios seculares y bíblicos/teológicos.
              </p>
              <textarea
                rows={4}
                required
                value={formData.testimonialEssay}
                onChange={(e) => handleChange('testimonialEssay', e.target.value)}
                placeholder="Escriba aquí su testimonio y reseña ministerial..."
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-utla-navy focus:outline-none"
              />
            </div>

            {/* 4. ¿CÓMO SE ENTERÓ DE UTLA? */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-800 mb-3 tracking-wider">
                ¿Cómo se enteró de Universidad de Teología Los Ángeles?:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {[
                  { id: 'Internet - Social Media', label: 'Internet / Social Media', icon: Globe },
                  { id: 'Radio', label: 'Radio', icon: RadioIcon },
                  { id: 'TV', label: 'TV', icon: Tv },
                  { id: 'Iglesia', label: 'Iglesia', icon: Church },
                  { id: 'Referencia de Alumno', label: 'Referencia de Alumno', icon: Users },
                  { id: 'Otro', label: 'Otro', icon: MoreHorizontal },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = formData.referralSource === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleChange('referralSource', item.id)}
                      className={`cursor-pointer p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-utla-gold/20 border-utla-gold text-utla-navy font-bold ring-2 ring-utla-gold/50'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-utla-navy" />
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <Link
                to="/login"
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-utla-navy hover:bg-utla-navy-light text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Continuar a Confirmación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: CONFIRMACIÓN */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900">
              <p className="font-bold">Por favor revise los datos ingresados antes de confirmar su solicitud de inscripción.</p>
              <p className="mt-0.5 text-blue-700">Verifique que su correo y teléfonos sean correctos para recibir su usuario y clave de acceso institucional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2">
                <h3 className="font-bold text-sm text-utla-navy uppercase border-b pb-2">Información Personal</h3>
                <p><strong>Nombre:</strong> {formData.fullName || 'No especificado'}</p>
                <p><strong>Correo:</strong> {formData.email || 'No especificado'}</p>
                <p><strong>Teléfono:</strong> {formData.mobilePhone || formData.phone || 'No especificado'}</p>
                <p><strong>Ubicación:</strong> {formData.city}, {formData.stateProvince}, {formData.country}</p>
                <p><strong>Nivel de Estudios:</strong> {formData.educationLevel}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-2">
                <h3 className="font-bold text-sm text-utla-navy uppercase border-b pb-2">Información Ministerial</h3>
                <p><strong>Iglesia:</strong> {formData.churchName || 'No especificado'}</p>
                <p><strong>Pastor:</strong> {formData.pastorName || 'No especificado'}</p>
                <p><strong>Ocupación:</strong> {formData.ministerialRole}</p>
                <p><strong>Medio de contacto:</strong> {formData.referralSource}</p>
                <p><strong>Opción de Pago:</strong> {formData.payNow ? 'Pagar Registración Ahora ($50.00 USD)' : 'Pagar Registración Después'}</p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Volver a Editar</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-utla-gold hover:bg-utla-gold-light text-utla-navy text-xs font-extrabold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>Finalizar y Crear Cuenta</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: COMPLETADO */}
        {currentStep === 3 && (
          <div className="text-center py-10 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-utla-navy uppercase font-serif">
              ¡Registro Completado con Éxito!
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tu solicitud de ingreso a la Universidad de Teología de Los Ángeles ha sido procesada correctamente.
              Hemos enviado un correo de bienvenida a <strong>{formData.email}</strong>.
            </p>
            {formData.payNow && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900">
                <p className="font-bold">Pago de Registración Registrado:</p>
                <p>Monto: $50.00 USD - Estado: Pendiente de Confirmación Bancaria / Simulado.</p>
              </div>
            )}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-6 py-3 bg-utla-navy text-white text-xs font-bold rounded-xl hover:bg-utla-navy-light uppercase tracking-wider"
              >
                Ir a Iniciar Sesión
              </button>
              <button
                type="button"
                onClick={() => navigate('/student')}
                className="w-full sm:w-auto px-6 py-3 bg-utla-gold text-utla-navy text-xs font-extrabold rounded-xl hover:bg-utla-gold-light uppercase tracking-wider"
              >
                Entrar Directo al Portal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
