import React, { useState } from 'react';
import { Calculator, TrendingDown, TrendingUp, Target, Clock, Flame, Dumbbell } from 'lucide-react';

const WeightLossCalculator: React.FC = () => {
  const [mode, setMode] = useState<'loss' | 'gain'>('loss');
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [weeks, setWeeks] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('1.55');
  const [result, setResult] = useState<{
    dailyCalories: number;
    weeklyChange: number;
    calorieAdjustment: number;
    bmr: number;
    tdee: number;
    protein: number;
  } | null>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();

    const currentLbs = parseFloat(currentWeight);
    const goalLbs = parseFloat(goalWeight);
    const duration = parseFloat(weeks);
    const heightIn = parseFloat(height);
    const ageYears = parseFloat(age);
    const activity = parseFloat(activityLevel);

    if (currentLbs && goalLbs && duration && heightIn && ageYears) {
      // Convert to metric for BMR calculation
      const currentKg = currentLbs * 0.453592;
      const heightCm = heightIn * 2.54;

      const totalChangeLbs = Math.abs(goalLbs - currentLbs);
      const weeklyChangeLbs = totalChangeLbs / duration;

      // Calculate BMR using Mifflin-St Jeor equation (requires kg and cm)
      let bmr: number;
      if (gender === 'male') {
        bmr = 10 * currentKg + 6.25 * heightCm - 5 * ageYears + 5;
      } else {
        bmr = 10 * currentKg + 6.25 * heightCm - 5 * ageYears - 161;
      }

      // Calculate TDEE
      const tdee = bmr * activity;

      let dailyCalories: number;
      let calorieAdjustment: number;

      if (mode === 'loss') {
        // Weight loss: caloric deficit (3500 calories = 1 lb)
        const weeklyDeficit = weeklyChangeLbs * 3500;
        calorieAdjustment = weeklyDeficit / 7;
        dailyCalories = Math.max(tdee - calorieAdjustment, 1200);
      } else {
        // Muscle gain: caloric surplus (more conservative, ~2500 cal = 1 lb lean mass)
        const weeklySurplus = weeklyChangeLbs * 2500;
        calorieAdjustment = weeklySurplus / 7;
        dailyCalories = tdee + calorieAdjustment;
      }

      // Protein recommendation: 0.8-1g per lb for muscle gain, 0.8g per lb for fat loss
      const proteinMultiplier = mode === 'gain' ? 1.0 : 0.8;
      const protein = currentLbs * proteinMultiplier;

      setResult({
        dailyCalories: Math.round(dailyCalories),
        weeklyChange: Math.round(weeklyChangeLbs * 100) / 100,
        calorieAdjustment: Math.round(calorieAdjustment),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        protein: Math.round(protein)
      });
    }
  };

  const inputClass = "w-full bg-brand-black border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-neon focus:ring-1 focus:ring-brand-neon outline-none transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2";

  return (
    <section id="calculator" className="py-20 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(#00FF41 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center">
          <p className="text-brand-neon font-bold tracking-widest uppercase text-sm mb-2">Free Tool</p>
          <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase">Fitness Calculator</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Calculate your daily calorie target based on your goals. Get a personalized estimate to kickstart your transformation.
          </p>

          {/* Mode Toggle */}
          <div className="flex justify-center mt-8">
            <div className="bg-brand-gray border border-white/10 rounded-xl p-1 inline-flex">
              <button
                type="button"
                onClick={() => { setMode('loss'); setResult(null); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
                  mode === 'loss'
                    ? 'bg-brand-neon text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Flame className="w-4 h-4" />
                Fat Loss
              </button>
              <button
                type="button"
                onClick={() => { setMode('gain'); setResult(null); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
                  mode === 'gain'
                    ? 'bg-brand-neon text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Dumbbell className="w-4 h-4" />
                Muscle Gain
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-brand-gray border border-white/10 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-black via-brand-neon to-brand-black"></div>

            <form onSubmit={calculate} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Current Weight (lbs)</label>
                  <input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className={inputClass}
                    placeholder="185"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Goal Weight (lbs)</label>
                  <input
                    type="number"
                    value={goalWeight}
                    onChange={(e) => setGoalWeight(e.target.value)}
                    className={inputClass}
                    placeholder="165"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Height (inches)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className={inputClass}
                    placeholder="70"
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={inputClass}
                    placeholder="30"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className={inputClass + " appearance-none"}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Timeframe (weeks)</label>
                  <input
                    type="number"
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                    className={inputClass}
                    placeholder="12"
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className={inputClass + " appearance-none"}
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
                className="w-full bg-brand-neon text-black font-black uppercase tracking-wider py-4 rounded-lg hover:bg-brand-neon/90 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate My Targets
              </button>
            </form>
          </div>

          {/* Results Panel */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="space-y-6">
                <div className="bg-brand-gray border border-brand-neon rounded-2xl p-8 text-center shadow-[0_0_40px_rgba(0,255,65,0.15)]">
                  <p className="text-gray-400 uppercase tracking-wider text-sm mb-2">Daily Calorie Target</p>
                  <p className="text-6xl md:text-7xl font-black text-brand-neon">{result.dailyCalories}</p>
                  <p className="text-gray-500 mt-2">calories per day</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-gray border border-white/10 rounded-xl p-4 text-center">
                    {mode === 'loss' ? (
                      <TrendingDown className="w-6 h-6 text-brand-neon mx-auto mb-2" />
                    ) : (
                      <TrendingUp className="w-6 h-6 text-brand-neon mx-auto mb-2" />
                    )}
                    <p className="text-2xl font-black text-white">{result.weeklyChange}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">lbs/week</p>
                  </div>
                  <div className="bg-brand-gray border border-white/10 rounded-xl p-4 text-center">
                    <Target className="w-6 h-6 text-brand-neon mx-auto mb-2" />
                    <p className="text-2xl font-black text-white">{mode === 'loss' ? '-' : '+'}{result.calorieAdjustment}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{mode === 'loss' ? 'deficit' : 'surplus'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-gray border border-white/10 rounded-xl p-4 text-center">
                    <Clock className="w-6 h-6 text-brand-neon mx-auto mb-2" />
                    <p className="text-2xl font-black text-white">{result.tdee}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">TDEE</p>
                  </div>
                  <div className="bg-brand-gray border border-white/10 rounded-xl p-4 text-center">
                    <Dumbbell className="w-6 h-6 text-brand-neon mx-auto mb-2" />
                    <p className="text-2xl font-black text-white">{result.protein}g</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Protein</p>
                  </div>
                </div>

                <p className="text-gray-500 text-sm text-center">
                  {mode === 'loss'
                    ? `Based on your BMR of ${result.bmr} cal. Combine with strength training to preserve muscle mass.`
                    : `Based on your BMR of ${result.bmr} cal. Focus on progressive overload and adequate recovery.`
                  }
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-brand-gray border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  {mode === 'loss' ? (
                    <Flame className="w-12 h-12 text-brand-neon/50" />
                  ) : (
                    <Dumbbell className="w-12 h-12 text-brand-neon/50" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enter Your Details</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  {mode === 'loss'
                    ? 'Fill out the form to calculate your personalized daily calorie target for fat loss.'
                    : 'Fill out the form to calculate your personalized daily calorie target for muscle gain.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeightLossCalculator;
