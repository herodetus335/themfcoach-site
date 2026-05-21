import React, { useState, useEffect } from 'react';
import { Head } from 'vite-react-ssg';
import { PAGE_META } from '../seo/pageMeta';
import { useForm, ValidationError } from '@formspree/react';
import Button from './Button';
import { ChevronLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Store in imperial (inches, lbs); convert for display
const INCHES_TO_CM = 2.54;
const LBS_TO_KG = 0.453592;

const formatHeightImperial = (inches: number) => {
  const ft = Math.floor(inches / 12);
  const inRem = Math.round(inches % 12);
  return inRem > 0 ? `${ft}'${inRem}"` : `${ft}'`;
};
const formatHeightMetric = (inches: number) => Math.round(inches * INCHES_TO_CM);

const HEIGHT_MIN = 48;
const HEIGHT_MAX = 96;
const WEIGHT_MIN = 80;
const WEIGHT_MAX = 400;

const FormPage: React.FC = () => {
  const [state, handleSubmit] = useForm("xqeezqvd");
  const [useMetric, setUseMetric] = useState(false);
  const [heightInches, setHeightInches] = useState(68); // 5'8"
  const [weightLbs, setWeightLbs] = useState(170);
  const [goalWeightLbs, setGoalWeightLbs] = useState(155);
  const [heightInput, setHeightInput] = useState('');
  const [heightFeetInput, setHeightFeetInput] = useState('');
  const [heightInchesInput, setHeightInchesInput] = useState('');
  const [heightFeetFocused, setHeightFeetFocused] = useState(false);
  const [heightInchesFocused, setHeightInchesFocused] = useState(false);
  const [heightCmFocused, setHeightCmFocused] = useState(false);
  const [weightFocused, setWeightFocused] = useState(false);
  const [goalFocused, setGoalFocused] = useState(false);
  const [weightInput, setWeightInput] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const [goalWeightUnknown, setGoalWeightUnknown] = useState(false);
  const [hasSetHeight, setHasSetHeight] = useState(false);
  const [hasSetWeight, setHasSetWeight] = useState(false);
  const [hasSetGoalWeight, setHasSetGoalWeight] = useState(false);
  const [showMeasurementErrors, setShowMeasurementErrors] = useState(false);

  const heightDisplay = useMetric ? formatHeightMetric(heightInches) : heightInches;
  const heightUnit = useMetric ? 'cm' : 'in';
  const heightFeet = Math.floor(heightInches / 12);
  const heightInchesRem = Math.round(heightInches % 12);
  const weightDisplay = useMetric ? Math.round(weightLbs * LBS_TO_KG) : weightLbs;
  const weightUnit = useMetric ? 'kg' : 'lbs';
  const goalDisplay = useMetric ? Math.round(goalWeightLbs * LBS_TO_KG) : goalWeightLbs;

  const commitHeight = (val: string) => {
    const n = parseFloat(val);
    if (!isNaN(n)) {
      const inches = useMetric ? n / INCHES_TO_CM : n;
      setHeightInches(Math.max(HEIGHT_MIN, Math.min(HEIGHT_MAX, Math.round(inches))));
    }
    setHeightInput('');
    setHeightCmFocused(false);
  };
  const setHeightFromFeetInches = (feet: number, inches: number) => {
    const total = Math.max(HEIGHT_MIN, Math.min(HEIGHT_MAX, feet * 12 + Math.round(inches)));
    setHeightInches(total);
    setHeightFeetInput('');
    setHeightInchesInput('');
    setHeightFeetFocused(false);
    setHeightInchesFocused(false);
  };
  const commitWeight = (val: string) => {
    const n = parseFloat(val);
    if (!isNaN(n)) {
      const lbs = useMetric ? n / LBS_TO_KG : n;
      setWeightLbs(Math.max(WEIGHT_MIN, Math.min(WEIGHT_MAX, Math.round(lbs))));
    }
    setWeightInput('');
    setWeightFocused(false);
  };
  const commitGoal = (val: string) => {
    const n = parseFloat(val);
    if (!isNaN(n)) {
      const lbs = useMetric ? n / LBS_TO_KG : n;
      setGoalWeightLbs(Math.max(WEIGHT_MIN, Math.min(WEIGHT_MAX, Math.round(lbs))));
    }
    setGoalInput('');
    setGoalFocused(false);
  };

  useEffect(() => {
    setHeightInput('');
    setHeightFeetInput('');
    setHeightInchesInput('');
    setHeightCmFocused(false);
    setHeightFeetFocused(false);
    setHeightInchesFocused(false);
    setWeightInput('');
    setWeightFocused(false);
    setGoalInput('');
    setGoalFocused(false);
  }, [useMetric]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    const hasGoalWeightAnswer = goalWeightUnknown || hasSetGoalWeight;
    const measurementsComplete = hasSetHeight && hasSetWeight && hasGoalWeightAnswer;

    if (!measurementsComplete) {
      e.preventDefault();
      setShowMeasurementErrors(true);
      return;
    }

    setShowMeasurementErrors(false);
    await handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <>
      <Head>
        <title>{PAGE_META.formSuccess.title}</title>
        <meta name="description" content={PAGE_META.formSuccess.description} />
      </Head>
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-brand-black relative">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#00FF41 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
        <div className="max-w-md w-full mx-4 bg-brand-gray border border-brand-neon p-8 rounded-2xl text-center shadow-[0_0_50px_rgba(0,255,65,0.1)] relative z-10">
          <div className="w-20 h-20 bg-brand-neon rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-3xl font-black text-white uppercase italic mb-4">Application Received</h1>
          <p className="text-gray-400 mb-8">
            Thank you for applying! I will review your application and get back to you within 24 hours to schedule your strategy session.
          </p>
          <Button to="/" variant="outline" fullWidth>Return Home</Button>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
    <Head>
      <title>{PAGE_META.form.title}</title>
      <meta name="description" content={PAGE_META.form.description} />
    </Head>
    <div className="min-h-screen pt-24 pb-12 bg-brand-black relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-brand-neon mb-8 transition-colors font-bold uppercase tracking-wider text-sm">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
        </Link>

        <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-black via-brand-neon to-brand-black"></div>

          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic mb-2">Apply for Coaching</h1>
            <p className="text-gray-400">
              Spaces are limited. Tell me about your goals so we can determine if we are a good fit.
            </p>
          </div>

          <form onSubmit={submitForm} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all"
                  placeholder="John Doe"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all"
                  placeholder="john@example.com"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all"
                  placeholder="(555) 123-4567"
                />
                <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="goal" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Primary Goal</label>
                <select
                  name="goal"
                  id="goal"
                  required
                  defaultValue="Muscle Gain"
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all appearance-none"
                >
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Fat Loss">Fat Loss</option>
                  <option value="Strength">Strength & Powerlifting</option>
                  <option value="Rehabilitation">Rehabilitation</option>
                  <option value="General Fitness">General Fitness</option>
                </select>
                <ValidationError prefix="Goal" field="goal" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="age" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Current Age</label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  required
                  min={13}
                  max={120}
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all"
                  placeholder="e.g. 28"
                />
                <ValidationError prefix="Age" field="age" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label htmlFor="gender" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  required
                  defaultValue=""
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <ValidationError prefix="Gender" field="gender" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Unit toggle and measurements */}
            <div className="space-y-6 p-4 bg-brand-black/50 rounded-xl border border-white/5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Units</span>
                <button
                  type="button"
                  role="switch"
                  onClick={() => setUseMetric(!useMetric)}
                  className={`relative inline-flex h-8 w-24 items-center rounded-full px-1 transition-colors ${useMetric ? 'bg-brand-neon/80' : 'bg-white/20'}`}
                  aria-pressed={useMetric}
                  aria-label="Toggle metric or imperial units"
                >
                  <span className={`inline-block h-6 w-6 shrink-0 transform rounded-full bg-white shadow transition-transform duration-200 ${useMetric ? 'translate-x-[68px]' : 'translate-x-1'}`} />
                  <span className={`absolute left-2 text-[10px] font-bold uppercase transition-colors ${!useMetric ? 'text-brand-neon' : 'text-white/50'}`}>Imp</span>
                  <span className={`absolute right-2 text-[10px] font-bold uppercase transition-colors ${useMetric ? 'text-black' : 'text-white/50'}`}>Metric</span>
                </button>
              </div>

              <div>
                <div className="flex justify-between items-center gap-3 mb-2">
                  <label htmlFor="height-slider" className="text-xs font-bold uppercase tracking-wider text-gray-500">Height</label>
                  <div className="flex items-center gap-2">
                    {useMetric ? (
                      <>
                        <input
                          type="text"
                          inputMode="decimal"
                          aria-label="Height in cm"
                          value={heightCmFocused ? heightInput : String(heightDisplay)}
                          onChange={(e) => setHeightInput(e.target.value)}
                          onFocus={(e) => { setHeightCmFocused(true); setHeightInput(String(heightDisplay)); e.target.select(); }}
                          onBlur={() => {
                            commitHeight(heightCmFocused ? (heightInput || String(heightDisplay)) : String(heightDisplay));
                            setHasSetHeight(true);
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                          className="w-20 bg-brand-black border border-white/10 rounded-lg px-2 py-1.5 text-right text-lg font-bold text-brand-neon tabular-nums focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none"
                        />
                        <span className="text-sm text-gray-500">cm</span>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          inputMode="numeric"
                          aria-label="Height in feet"
                          value={heightFeetFocused ? heightFeetInput : String(heightFeet)}
                          onChange={(e) => setHeightFeetInput(e.target.value)}
                          onFocus={(e) => { setHeightFeetFocused(true); setHeightFeetInput(String(heightFeet)); e.target.select(); }}
                          onBlur={() => {
                            setHeightFromFeetInches(
                              heightFeetFocused ? (Math.min(8, Math.max(4, parseInt(heightFeetInput) || 4))) : heightFeet,
                              heightInchesFocused ? (Math.min(11, Math.max(0, parseInt(heightInchesInput) || 0))) : heightInchesRem
                            );
                            setHasSetHeight(true);
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                          className="w-14 bg-brand-black border border-white/10 rounded-lg px-2 py-1.5 text-right text-lg font-bold text-brand-neon tabular-nums focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none"
                        />
                        <span className="text-sm text-gray-500">ft</span>
                        <input
                          type="text"
                          inputMode="numeric"
                          aria-label="Height in inches"
                          value={heightInchesFocused ? heightInchesInput : String(heightInchesRem)}
                          onChange={(e) => setHeightInchesInput(e.target.value)}
                          onFocus={(e) => { setHeightInchesFocused(true); setHeightInchesInput(String(heightInchesRem)); e.target.select(); }}
                          onBlur={() => {
                            setHeightFromFeetInches(
                              heightFeetFocused ? (Math.min(8, Math.max(4, parseInt(heightFeetInput) || 4))) : heightFeet,
                              heightInchesFocused ? (Math.min(11, Math.max(0, parseInt(heightInchesInput) || 0))) : heightInchesRem
                            );
                            setHasSetHeight(true);
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                          className="w-14 bg-brand-black border border-white/10 rounded-lg px-2 py-1.5 text-right text-lg font-bold text-brand-neon tabular-nums focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none"
                        />
                        <span className="text-sm text-gray-500">in</span>
                      </>
                    )}
                  </div>
                </div>
                <input
                  type="range"
                  id="height-slider"
                  min={HEIGHT_MIN}
                  max={HEIGHT_MAX}
                  value={heightInches}
                  onChange={(e) => {
                    setHeightInches(Number(e.target.value));
                    setHasSetHeight(true);
                  }}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-neon [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,65,0.5)] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-neon [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <input type="hidden" name="height" value={useMetric ? `${formatHeightMetric(heightInches)} cm` : formatHeightImperial(heightInches)} />
                <ValidationError prefix="Height" field="height" errors={state.errors} className="text-red-500 text-sm mt-1" />
                {showMeasurementErrors && !hasSetHeight && (
                  <p className="text-red-500 text-sm mt-1">Please set your height.</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center gap-3 mb-2">
                  <label htmlFor="weight-slider" className="text-xs font-bold uppercase tracking-wider text-gray-500">Current Weight</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      inputMode="decimal"
                      aria-label="Current weight"
                      value={weightFocused ? weightInput : String(weightDisplay)}
                      onChange={(e) => setWeightInput(e.target.value)}
                      onFocus={(e) => { setWeightFocused(true); setWeightInput(String(weightDisplay)); e.target.select(); }}
                      onBlur={() => {
                        commitWeight(weightFocused ? (weightInput || String(weightDisplay)) : String(weightDisplay));
                        setHasSetWeight(true);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                      className="w-20 bg-brand-black border border-white/10 rounded-lg px-2 py-1.5 text-right text-lg font-bold text-brand-neon tabular-nums focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none"
                    />
                    <span className="text-sm text-gray-500">{weightUnit}</span>
                  </div>
                </div>
                <input
                  type="range"
                  id="weight-slider"
                  min={WEIGHT_MIN}
                  max={WEIGHT_MAX}
                  value={weightLbs}
                  onChange={(e) => {
                    setWeightLbs(Number(e.target.value));
                    setHasSetWeight(true);
                  }}
                  className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-neon [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,65,0.5)] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-neon [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <input type="hidden" name="weight" value={useMetric ? `${Math.round(weightLbs * LBS_TO_KG)} kg` : `${weightLbs} lbs`} />
                <ValidationError prefix="Weight" field="weight" errors={state.errors} className="text-red-500 text-sm mt-1" />
                {showMeasurementErrors && !hasSetWeight && (
                  <p className="text-red-500 text-sm mt-1">Please set your current weight.</p>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center gap-3 mb-2">
                  <label htmlFor="goal-weight-slider" className="text-xs font-bold uppercase tracking-wider text-gray-500">Goal Weight</label>
                  <div className="flex items-center gap-2 flex-wrap">
                    {goalWeightUnknown ? (
                      <>
                        <span className="text-gray-400 italic">I don&apos;t know</span>
                        <button
                          type="button"
                          onClick={() => setGoalWeightUnknown(false)}
                          className="text-xs text-brand-neon hover:underline"
                        >
                          Change
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setGoalWeightUnknown(true);
                            setHasSetGoalWeight(true);
                          }}
                          className="text-xs text-gray-400 hover:text-gray-300 px-2 py-1 rounded border border-white/10 hover:border-white/20 transition-colors"
                        >
                          I don&apos;t know
                        </button>
                        <input
                          type="text"
                          inputMode="decimal"
                          aria-label="Goal weight"
                          value={goalFocused ? goalInput : String(goalDisplay)}
                          onChange={(e) => setGoalInput(e.target.value)}
                          onFocus={(e) => { setGoalFocused(true); setGoalInput(String(goalDisplay)); e.target.select(); }}
                          onBlur={() => {
                            commitGoal(goalFocused ? (goalInput || String(goalDisplay)) : String(goalDisplay));
                            setHasSetGoalWeight(true);
                          }}
                          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
                          className="w-20 bg-brand-black border border-white/10 rounded-lg px-2 py-1.5 text-right text-lg font-bold text-brand-neon tabular-nums focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none"
                        />
                        <span className="text-sm text-gray-500">{weightUnit}</span>
                      </>
                    )}
                  </div>
                </div>
                {!goalWeightUnknown && (
                  <input
                    type="range"
                    id="goal-weight-slider"
                    min={WEIGHT_MIN}
                    max={WEIGHT_MAX}
                    value={goalWeightLbs}
                    onChange={(e) => {
                      setGoalWeightLbs(Number(e.target.value));
                      setHasSetGoalWeight(true);
                    }}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-neon [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,255,65,0.5)] [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-neon [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                  />
                )}
                <input type="hidden" name="goal_weight" value={goalWeightUnknown ? "I don't know" : (useMetric ? `${Math.round(goalWeightLbs * LBS_TO_KG)} kg` : `${goalWeightLbs} lbs`)} />
                <ValidationError prefix="Goal Weight" field="goal_weight" errors={state.errors} className="text-red-500 text-sm mt-1" />
                {showMeasurementErrors && !(goalWeightUnknown || hasSetGoalWeight) && (
                  <p className="text-red-500 text-sm mt-1">Please set your goal weight or select "I don't know".</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="timeline" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Timeline (How fast do you want results?)</label>
                <select
                  name="timeline"
                  id="timeline"
                  required
                  defaultValue=""
                  className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select...</option>
                  <option value="As fast as possible">As fast as possible</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="12 months">12 months</option>
                  <option value="No rush">No rush / Flexible</option>
                </select>
                <ValidationError prefix="Timeline" field="timeline" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Location (City/County)</label>
              <input
                type="text"
                name="location"
                id="location"
                required
                className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all"
                placeholder="e.g. Ashburn, Fairfax"
              />
              <ValidationError prefix="Location" field="location" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Current Struggles / Notes</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                className="w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all resize-none"
                placeholder="Tell me a bit about your current routine and what's holding you back..."
              ></textarea>
              <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-sm mt-1" />
            </div>

            <Button type="submit" fullWidth variant="primary" className="py-4 text-lg" disabled={state.submitting}>
              {state.submitting ? 'Submitting...' : 'Secure Your Spot'}
            </Button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default FormPage;
