import React, { useState } from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import {
  Calculator,
  TrendingDown,
  TrendingUp,
  Target,
  Clock,
  Flame,
  Dumbbell,
  Loader2,
  ChevronLeft,
} from 'lucide-react';
import { PAGE_META } from '../seo/pageMeta';
import {
  calculateFitnessTargets,
  isValidEmail,
  type CalculatorMode,
  type CalculatorResult,
} from '../utils/fitnessCalculator';
import Button from '../components/Button';
import NutritionImageGrid from '../components/NutritionImageGrid';

/** Calorie Calculator Submissions — must NOT use the coaching intake form (xqeezqvd). */
const FORMSPREE_FORM_ID = 'mbdnnozk';
const FORMSPREE_ENDPOINT = 'https://formspree.io';
const FORMSPREE_FORM_URL = `${FORMSPREE_ENDPOINT}/f/${FORMSPREE_FORM_ID}`;

const INCHES_PER_CM = 1 / 2.54;
const CM_PER_INCH = 2.54;

const ACTIVITY_LABELS: Record<string, string> = {
  '1.2': 'Sedentary (little or no exercise)',
  '1.375': 'Light (exercise 1-3 days/week)',
  '1.55': 'Moderate (exercise 3-5 days/week)',
  '1.725': 'Active (exercise 6-7 days/week)',
  '1.9': 'Very Active (hard exercise daily)',
};

const inputClass =
  'w-full bg-brand-black border border-white/10 rounded-lg px-4 py-2.5 sm:py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all min-h-[44px]';
const inputErrorClass = ' border-red-400/70 focus:border-red-400 focus:ring-red-400/40';
const labelClass = 'block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5';
const fieldErrorClass = 'text-red-400 text-xs mt-1';

const cardClass =
  'rounded-2xl border border-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.45)] relative overflow-hidden';

/** Opaque charcoal card — readable over the photo background */
const cardStyle: React.CSSProperties = {
  backgroundColor: 'rgba(30, 30, 30, 0.96)',
};

type FieldErrors = {
  currentWeight?: string;
  goalWeight?: string;
  height?: string;
  age?: string;
  weeks?: string;
};

function parsePositiveNumber(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function totalInchesFromParts(feet: string, inches: string): number | null {
  if (feet.trim() === '' && inches.trim() === '') return null;
  const ft = parsePositiveNumber(feet);
  if (ft === null) return null;
  const inch = inches.trim() === '' ? 0 : parsePositiveNumber(inches);
  if (inch === null) return null;
  return ft * 12 + inch;
}

function inchesToFeetInches(totalInches: number): { feet: string; inches: string } {
  const rounded = Math.round(totalInches);
  const feet = Math.floor(rounded / 12);
  const inches = rounded % 12;
  return { feet: String(feet), inches: String(inches) };
}

const CalculatorPage: React.FC = () => {
  const [formspreeState, submitToFormspree] = useForm(FORMSPREE_FORM_ID, {
    endpoint: FORMSPREE_ENDPOINT,
  });
  const [step, setStep] = useState<1 | 2>(1);

  const [mode, setMode] = useState<CalculatorMode>('loss');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [weeks, setWeeks] = useState('');
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState('1.55');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [pendingResult, setPendingResult] = useState<CalculatorResult | null>(null);
  const [submitFailed, setSubmitFailed] = useState(false);

  const isSubmitting = formspreeState.submitting;
  const showResults = formspreeState.succeeded && pendingResult !== null;

  const getHeightInches = (): number | null => {
    if (heightUnit === 'imperial') {
      return totalInchesFromParts(heightFeet, heightInches);
    }
    const cm = parsePositiveNumber(heightCm);
    if (cm === null) return null;
    return cm * INCHES_PER_CM;
  };

  const switchHeightUnit = (next: 'imperial' | 'metric') => {
    if (next === heightUnit) return;
    const totalInches = getHeightInches();

    if (next === 'metric') {
      if (totalInches !== null && totalInches > 0) {
        setHeightCm(String(Math.round(totalInches * CM_PER_INCH)));
      }
    } else if (totalInches !== null && totalInches > 0) {
      const parts = inchesToFeetInches(totalInches);
      setHeightFeet(parts.feet);
      setHeightInches(parts.inches);
    }

    setHeightUnit(next);
    setFieldErrors((prev) => ({ ...prev, height: undefined }));
  };

  const validateStep1 = (): { ok: true; heightInches: number } | { ok: false } => {
    const errors: FieldErrors = {};
    const current = parsePositiveNumber(currentWeight);
    const target = parsePositiveNumber(goalWeight);
    const ageYears = parsePositiveNumber(age);
    const timeframe = parsePositiveNumber(weeks);
    const heightTotal = getHeightInches();

    if (current === null) {
      errors.currentWeight = 'Enter your current weight.';
    } else if (current < 80 || current > 400) {
      errors.currentWeight = 'Please enter a weight between 80 and 400 lbs.';
    }

    if (target === null) {
      errors.goalWeight = 'Enter your target weight.';
    } else if (target < 80 || target > 400) {
      errors.goalWeight = 'Please enter a target weight between 80 and 400 lbs.';
    } else if (current !== null && Math.abs(target - current) < 1) {
      errors.goalWeight = 'Target weight should be different from your current weight.';
    }

    if (heightUnit === 'imperial') {
      const ft = parsePositiveNumber(heightFeet);
      const inch =
        heightInches.trim() === '' ? 0 : parsePositiveNumber(heightInches);
      if (heightFeet.trim() === '' && heightInches.trim() === '') {
        errors.height = 'Enter your height in feet and inches.';
      } else if (ft === null || ft < 4 || ft > 7) {
        errors.height = 'Feet should be between 4 and 7.';
      } else if (inch === null || inch < 0 || inch > 11) {
        errors.height = 'Inches should be between 0 and 11.';
      } else if (heightTotal === null || heightTotal < 48 || heightTotal > 90) {
        errors.height = 'Please enter a height between 4 ft 0 in and 7 ft 6 in.';
      }
    } else {
      const cm = parsePositiveNumber(heightCm);
      if (cm === null) {
        errors.height = 'Enter your height in centimeters.';
      } else if (cm < 122 || cm > 229) {
        errors.height = 'Please enter a height between 122 and 229 cm.';
      }
    }

    if (ageYears === null) {
      errors.age = 'Enter your age.';
    } else if (ageYears < 13 || ageYears > 100) {
      errors.age = 'Please enter an age between 13 and 100.';
    } else if (!Number.isInteger(ageYears)) {
      errors.age = 'Age should be a whole number.';
    }

    if (timeframe === null) {
      errors.weeks = 'Enter your timeframe in weeks.';
    } else if (timeframe < 1 || timeframe > 104) {
      errors.weeks = 'Please choose a timeframe between 1 and 104 weeks.';
    } else if (!Number.isInteger(timeframe)) {
      errors.weeks = 'Timeframe should be a whole number of weeks.';
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0 || heightTotal === null) {
      return { ok: false };
    }

    return { ok: true, heightInches: heightTotal };
  };

  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateStep1();
    if (result.ok) {
      setStep(2);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting || showResults || step !== 2) return;

    setEmailError('');
    setFormError('');
    setSubmitFailed(false);

    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!firstName.trim()) {
      setFormError('Please enter your first name.');
      return;
    }

    const step1 = validateStep1();
    if (!step1.ok) {
      setFormError('Please go back and fix the highlighted fields.');
      setStep(1);
      return;
    }

    const calculated = calculateFitnessTargets({
      currentWeightLbs: parseFloat(currentWeight),
      goalWeightLbs: parseFloat(goalWeight),
      heightInches: step1.heightInches,
      ageYears: parseFloat(age),
      gender,
      weeks: parseFloat(weeks),
      activityLevel: parseFloat(activityLevel),
      mode,
    });

    if (!calculated) {
      setFormError('Please go back and complete all calculator fields.');
      setStep(1);
      return;
    }

    const heightParts = inchesToFeetInches(step1.heightInches);
    const heightTotalRounded = String(Math.round(step1.heightInches * 10) / 10);
    const heightCmValue =
      heightUnit === 'metric'
        ? heightCm || String(Math.round(step1.heightInches * CM_PER_INCH))
        : '';

    // Submit a plain data object to Formspree so the target form ID cannot be ambiguous.
    // Posts to: https://formspree.io/f/mbdnnozk
    const payload = {
      first_name: firstName.trim(),
      email: trimmedEmail,
      goal_type: mode === 'loss' ? 'fat loss' : 'muscle gain',
      current_weight_lbs: currentWeight,
      target_weight_lbs: goalWeight,
      height_feet:
        heightUnit === 'imperial' ? heightFeet || heightParts.feet : heightParts.feet,
      height_inches:
        heightUnit === 'imperial'
          ? heightInches === ''
            ? heightParts.inches
            : heightInches
          : heightParts.inches,
      height_centimeters: heightCmValue,
      height_total_inches: heightTotalRounded,
      age,
      gender,
      timeframe_weeks: weeks,
      activity_level: ACTIVITY_LABELS[activityLevel] || activityLevel,
      estimated_daily_calories: String(calculated.dailyCalories),
      estimated_daily_protein_grams: String(calculated.protein),
      estimated_weekly_change_lbs: String(calculated.weeklyChange),
      estimated_calorie_adjustment: String(calculated.calorieAdjustment),
      estimated_bmr: String(calculated.bmr),
      estimated_tdee: String(calculated.tdee),
      submission_source: 'MF Coach Calculator',
      page_url:
        typeof window !== 'undefined'
          ? window.location.href
          : 'https://www.themfcoachweb.com/calculator',
      _subject: 'MF Coach Calculator Lead',
      _gotcha: '',
    };

    // Hold results for the success screen; only shown when formspreeState.succeeded
    setPendingResult(calculated);
    await submitToFormspree(payload);
  };

  // Surface Formspree failures without leaving Step 2 or clearing inputs
  React.useEffect(() => {
    if (formspreeState.succeeded) {
      setSubmitFailed(false);
      return;
    }
    if (!formspreeState.submitting && formspreeState.errors) {
      setSubmitFailed(true);
    }
  }, [formspreeState.succeeded, formspreeState.submitting, formspreeState.errors]);

  return (
    <>
      <Head>
        <title>{PAGE_META.calculator.title}</title>
        <meta name="description" content={PAGE_META.calculator.description} />
      </Head>

      <div
        className="relative flex flex-col flex-1 min-h-[100dvh] overflow-x-hidden"
        style={{ ['--header-height' as string]: '64px' } as React.CSSProperties}
      >
        {/* Absolute decorative layer — does not contribute to document height */}
        <NutritionImageGrid />

        {/* Offset for fixed header; main grows and centers content on desktop */}
        <div className="relative z-10 flex flex-1 flex-col pt-[var(--header-height)]">
          <div className="relative z-10 flex flex-1 flex-col justify-start lg:justify-center w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 sm:pt-7 sm:pb-9 lg:py-8">
            <div className="w-full">
            {showResults && pendingResult ? (
              <div
                className={`max-w-xl mx-auto ${cardClass} p-5 sm:p-7 space-y-4`}
                style={cardStyle}
                aria-live="polite"
              >
                <div className="text-center">
                  <p className="text-gray-400 uppercase tracking-wider text-sm mb-2">
                    Daily Calorie Target
                  </p>
                  <p className="text-5xl sm:text-6xl font-black text-brand-neon">
                    {pendingResult.dailyCalories}
                  </p>
                  <p className="text-gray-500 mt-2">calories per day</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-black/60 border border-white/10 rounded-xl p-3 text-center">
                    {mode === 'loss' ? (
                      <TrendingDown className="w-5 h-5 text-brand-neon mx-auto mb-1.5" aria-hidden="true" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-brand-neon mx-auto mb-1.5" aria-hidden="true" />
                    )}
                    <p className="text-xl font-black text-white">{pendingResult.weeklyChange}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">lbs/week</p>
                  </div>
                  <div className="bg-brand-black/60 border border-white/10 rounded-xl p-3 text-center">
                    <Target className="w-5 h-5 text-brand-neon mx-auto mb-1.5" aria-hidden="true" />
                    <p className="text-xl font-black text-white">
                      {mode === 'loss' ? '-' : '+'}
                      {pendingResult.calorieAdjustment}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {mode === 'loss' ? 'deficit' : 'surplus'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-brand-black/60 border border-white/10 rounded-xl p-3 text-center">
                    <Clock className="w-5 h-5 text-brand-neon mx-auto mb-1.5" aria-hidden="true" />
                    <p className="text-xl font-black text-white">{pendingResult.tdee}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">TDEE</p>
                  </div>
                  <div className="bg-brand-black/60 border border-white/10 rounded-xl p-3 text-center">
                    <Dumbbell className="w-5 h-5 text-brand-neon mx-auto mb-1.5" aria-hidden="true" />
                    <p className="text-xl font-black text-white">{pendingResult.protein}g</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Protein</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm text-center">
                  Based on your BMR of {pendingResult.bmr} cal.{' '}
                  {mode === 'loss'
                    ? 'Combine with strength training to preserve muscle mass.'
                    : 'Focus on progressive overload and adequate recovery.'}
                </p>

                <p className="text-gray-500 text-xs text-center leading-relaxed">
                  These figures are estimates for general fitness education only and are not medical
                  advice. Consult a qualified healthcare professional before changing your diet or
                  training.
                </p>

                <Button to="/form" variant="primary" fullWidth className="py-3.5 text-base">
                  Apply for Online Coaching
                </Button>
              </div>
            ) : (
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-10 lg:items-center">
                <header className="relative lg:col-span-5 text-center lg:text-left mb-5 lg:mb-0 lg:pr-4">
                  <h1 className="relative text-[34px] leading-[1.08] sm:text-[38px] lg:text-[48px] xl:text-[52px] font-black text-white italic uppercase tracking-tight mb-2.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                    Find Your Personalized
                    <br />
                    Calorie and Protein Targets
                  </h1>
                  <p className="relative text-gray-100 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 drop-shadow-[0_1px_6px_rgba(0,0,0,0.65)]">
                    Answer a few questions and get your estimated daily targets in less than 60
                    seconds.
                  </p>
                </header>

                <div className="lg:col-span-7">
                  <div className={`${cardClass} p-4 sm:p-5 lg:p-6`} style={cardStyle}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-black via-brand-neon to-brand-black" />

                    <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Step {step} of 2
                      </p>
                      <p className="text-xs font-bold uppercase tracking-wider text-brand-neon">
                        {step === 1 ? 'Your targets' : 'Get your results'}
                      </p>
                    </div>

                    {step === 1 ? (
                    <form
                      onSubmit={goToStep2}
                      className="space-y-3 sm:space-y-3.5"
                      noValidate
                    >
                        <>
                          <div className="flex justify-center lg:justify-start">
                            <div
                              className="bg-brand-black border border-white/10 rounded-xl p-1 inline-flex w-full sm:w-auto"
                              role="group"
                              aria-label="Goal type"
                            >
                              <button
                                type="button"
                                onClick={() => setMode('loss')}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-all min-h-[44px] ${
                                  mode === 'loss'
                                    ? 'bg-brand-neon text-black'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                <Flame className="w-4 h-4" aria-hidden="true" />
                                Fat Loss
                              </button>
                              <button
                                type="button"
                                onClick={() => setMode('gain')}
                                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-all min-h-[44px] ${
                                  mode === 'gain'
                                    ? 'bg-brand-neon text-black'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                <Dumbbell className="w-4 h-4" aria-hidden="true" />
                                Muscle Gain
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="currentWeight" className={labelClass}>
                                Current Weight (lbs)
                              </label>
                              <input
                                id="currentWeight"
                                type="number"
                                inputMode="decimal"
                                value={currentWeight}
                                onChange={(e) => {
                                  setCurrentWeight(e.target.value);
                                  if (fieldErrors.currentWeight) {
                                    setFieldErrors((prev) => ({ ...prev, currentWeight: undefined }));
                                  }
                                }}
                                className={inputClass + (fieldErrors.currentWeight ? inputErrorClass : '')}
                                placeholder="185"
                                autoComplete="off"
                                aria-invalid={Boolean(fieldErrors.currentWeight)}
                              />
                              {fieldErrors.currentWeight && (
                                <p className={fieldErrorClass} role="alert">
                                  {fieldErrors.currentWeight}
                                </p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="goalWeight" className={labelClass}>
                                Target Weight (lbs)
                              </label>
                              <input
                                id="goalWeight"
                                type="number"
                                inputMode="decimal"
                                value={goalWeight}
                                onChange={(e) => {
                                  setGoalWeight(e.target.value);
                                  if (fieldErrors.goalWeight) {
                                    setFieldErrors((prev) => ({ ...prev, goalWeight: undefined }));
                                  }
                                }}
                                className={inputClass + (fieldErrors.goalWeight ? inputErrorClass : '')}
                                placeholder="165"
                                autoComplete="off"
                                aria-invalid={Boolean(fieldErrors.goalWeight)}
                              />
                              {fieldErrors.goalWeight && (
                                <p className={fieldErrorClass} role="alert">
                                  {fieldErrors.goalWeight}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <label
                                  htmlFor={heightUnit === 'imperial' ? 'heightFeet' : 'heightCm'}
                                  className="text-xs font-bold uppercase tracking-wider text-gray-400"
                                >
                                  Height
                                </label>
                                <button
                                  type="button"
                                  onClick={() =>
                                    switchHeightUnit(heightUnit === 'imperial' ? 'metric' : 'imperial')
                                  }
                                  className="text-[11px] font-semibold text-gray-400 hover:text-brand-neon transition-colors underline-offset-2 hover:underline whitespace-nowrap"
                                >
                                  {heightUnit === 'imperial' ? 'Use centimeters' : 'Use feet & inches'}
                                </button>
                              </div>

                              {heightUnit === 'imperial' ? (
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="min-w-0">
                                    <label htmlFor="heightFeet" className="sr-only">
                                      Feet
                                    </label>
                                    <input
                                      id="heightFeet"
                                      type="number"
                                      inputMode="numeric"
                                      value={heightFeet}
                                      onChange={(e) => {
                                        setHeightFeet(e.target.value);
                                        if (fieldErrors.height) {
                                          setFieldErrors((prev) => ({ ...prev, height: undefined }));
                                        }
                                      }}
                                      className={
                                        inputClass + (fieldErrors.height ? inputErrorClass : '')
                                      }
                                      placeholder="5"
                                      autoComplete="off"
                                      aria-label="Feet"
                                    />
                                    <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-500">
                                      Feet
                                    </span>
                                  </div>
                                  <div className="min-w-0">
                                    <label htmlFor="heightInches" className="sr-only">
                                      Inches
                                    </label>
                                    <input
                                      id="heightInches"
                                      type="number"
                                      inputMode="numeric"
                                      value={heightInches}
                                      onChange={(e) => {
                                        setHeightInches(e.target.value);
                                        if (fieldErrors.height) {
                                          setFieldErrors((prev) => ({ ...prev, height: undefined }));
                                        }
                                      }}
                                      className={
                                        inputClass + (fieldErrors.height ? inputErrorClass : '')
                                      }
                                      placeholder="10"
                                      autoComplete="off"
                                      aria-label="Inches"
                                    />
                                    <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-500">
                                      Inches
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <input
                                    id="heightCm"
                                    type="number"
                                    inputMode="decimal"
                                    value={heightCm}
                                    onChange={(e) => {
                                      setHeightCm(e.target.value);
                                      if (fieldErrors.height) {
                                        setFieldErrors((prev) => ({ ...prev, height: undefined }));
                                      }
                                    }}
                                    className={
                                      inputClass + (fieldErrors.height ? inputErrorClass : '')
                                    }
                                    placeholder="178"
                                    autoComplete="off"
                                    aria-label="Height in centimeters"
                                  />
                                  <span className="mt-1 block text-[10px] uppercase tracking-wider text-gray-500">
                                    Centimeters
                                  </span>
                                </div>
                              )}
                              {fieldErrors.height && (
                                <p className={fieldErrorClass} role="alert">
                                  {fieldErrors.height}
                                </p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="age" className={labelClass}>
                                Age
                              </label>
                              <input
                                id="age"
                                type="number"
                                inputMode="numeric"
                                value={age}
                                onChange={(e) => {
                                  setAge(e.target.value);
                                  if (fieldErrors.age) {
                                    setFieldErrors((prev) => ({ ...prev, age: undefined }));
                                  }
                                }}
                                className={inputClass + (fieldErrors.age ? inputErrorClass : '')}
                                placeholder="30"
                                autoComplete="off"
                                aria-invalid={Boolean(fieldErrors.age)}
                              />
                              {fieldErrors.age && (
                                <p className={fieldErrorClass} role="alert">
                                  {fieldErrors.age}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="gender" className={labelClass}>
                                Gender
                              </label>
                              <select
                                id="gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                                className={inputClass + ' appearance-none'}
                              >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>
                            <div>
                              <label htmlFor="weeks" className={labelClass}>
                                Timeframe (weeks)
                              </label>
                              <input
                                id="weeks"
                                type="number"
                                inputMode="numeric"
                                value={weeks}
                                onChange={(e) => {
                                  setWeeks(e.target.value);
                                  if (fieldErrors.weeks) {
                                    setFieldErrors((prev) => ({ ...prev, weeks: undefined }));
                                  }
                                }}
                                className={inputClass + (fieldErrors.weeks ? inputErrorClass : '')}
                                placeholder="12"
                                autoComplete="off"
                                aria-invalid={Boolean(fieldErrors.weeks)}
                              />
                              {fieldErrors.weeks && (
                                <p className={fieldErrorClass} role="alert">
                                  {fieldErrors.weeks}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label htmlFor="activityLevel" className={labelClass}>
                              Activity Level
                            </label>
                            <select
                              id="activityLevel"
                              value={activityLevel}
                              onChange={(e) => setActivityLevel(e.target.value)}
                              className={inputClass + ' appearance-none'}
                            >
                              <option value="1.2">Sedentary (little or no exercise)</option>
                              <option value="1.375">Light (exercise 1-3 days/week)</option>
                              <option value="1.55">Moderate (exercise 3-5 days/week)</option>
                              <option value="1.725">Active (exercise 6-7 days/week)</option>
                              <option value="1.9">Very Active (hard exercise daily)</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            className="w-full bg-brand-neon text-black font-black uppercase tracking-wider py-3 rounded-lg hover:bg-brand-neon/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] min-h-[48px]"
                          >
                            Continue
                          </button>
                        </>
                    </form>
                    ) : (
                    <form
                      action={FORMSPREE_FORM_URL}
                      method="POST"
                      onSubmit={onSubmit}
                      className="space-y-3 sm:space-y-3.5"
                      noValidate
                    >
                      {/* Honeypot — hidden from users and assistive tech */}
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                        className="absolute -left-[9999px] h-px w-px opacity-0 overflow-hidden"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setEmailError('');
                          setFormError('');
                          setSubmitFailed(false);
                        }}
                        className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-400 hover:text-brand-neon transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                        Back
                      </button>

                      <div>
                        <label htmlFor="firstName" className={labelClass}>
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="first_name"
                          type="text"
                          autoComplete="given-name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className={inputClass}
                          placeholder="Alex"
                          required
                        />
                        <ValidationError
                          prefix="First Name"
                          field="first_name"
                          errors={formspreeState.errors}
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (emailError) setEmailError('');
                            if (submitFailed) setSubmitFailed(false);
                          }}
                          className={inputClass}
                          placeholder="alex@example.com"
                          required
                          aria-invalid={Boolean(emailError)}
                          aria-describedby={emailError ? 'email-error' : undefined}
                        />
                        {emailError && (
                          <p id="email-error" className="text-red-400 text-sm mt-1" role="alert">
                            {emailError}
                          </p>
                        )}
                        <ValidationError
                          prefix="Email"
                          field="email"
                          errors={formspreeState.errors}
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      {(formError || submitFailed || formspreeState.errors) &&
                        !formspreeState.succeeded && (
                          <p className="text-red-400 text-sm text-center" role="alert">
                            {formError ||
                              'We couldn’t submit your information. Please check your connection and try again.'}
                          </p>
                        )}
                      <ValidationError
                        errors={formspreeState.errors}
                        className="text-red-400 text-sm text-center"
                      />

                      <button
                        type="submit"
                        disabled={formspreeState.submitting}
                        aria-busy={formspreeState.submitting}
                        className="w-full bg-brand-neon text-black font-black uppercase tracking-wider py-3 rounded-lg hover:bg-brand-neon/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none min-h-[48px]"
                      >
                        {formspreeState.submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Calculator className="w-5 h-5" aria-hidden="true" />
                            Show My Results
                          </>
                        )}
                      </button>

                      <p className="text-gray-400 text-xs leading-relaxed text-center px-1">
                        By submitting, you agree to receive your calculator results and occasional
                        fitness tips, updates, and offers from The MF Coach by email. You can
                        unsubscribe at any time.{' '}
                        <Link
                          to="/privacy"
                          className="text-gray-200 underline underline-offset-2 hover:text-brand-neon transition-colors"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                    )}
                  </div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
