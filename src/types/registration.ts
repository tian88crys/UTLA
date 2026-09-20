export interface StudentRegistrationData {
  payNow: boolean;
  registrationFee: number;
  
  // Personal Info
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  educationLevel: string;
  phone: string;
  mobilePhone: string;
  address: string;
  country: string;
  stateProvince: string;
  city: string;
  postalCode: string;

  // Ministerial Info
  churchName: string;
  pastorName: string;
  churchAddress: string;
  churchCityZip: string;
  ministerialRole: string;

  // Reseña Ministerial / Testimonio
  testimonialEssay: string;

  // Referral Source
  referralSource: 'Internet - Social Media' | 'Radio' | 'TV' | 'Iglesia' | 'Referencia de Alumno' | 'Otro';
}
