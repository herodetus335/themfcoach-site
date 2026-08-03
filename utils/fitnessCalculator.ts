export type CalculatorMode = 'loss' | 'gain';

export interface CalculatorInput {
  currentWeightLbs: number;
  goalWeightLbs: number;
  heightInches: number;
  ageYears: number;
  gender: 'male' | 'female';
  weeks: number;
  activityLevel: number;
  mode: CalculatorMode;
}

export interface CalculatorResult {
  dailyCalories: number;
  weeklyChange: number;
  calorieAdjustment: number;
  bmr: number;
  tdee: number;
  protein: number;
}

/**
 * Personalized calorie/protein targets (Mifflin–St Jeor BMR).
 * Kept identical to the previous inline WeightLossCalculator formulas.
 */
export function calculateFitnessTargets(input: CalculatorInput): CalculatorResult | null {
  const {
    currentWeightLbs,
    goalWeightLbs,
    heightInches,
    ageYears,
    gender,
    weeks,
    activityLevel,
    mode,
  } = input;

  if (
    !currentWeightLbs ||
    !goalWeightLbs ||
    !weeks ||
    !heightInches ||
    !ageYears ||
    !activityLevel
  ) {
    return null;
  }

  const currentKg = currentWeightLbs * 0.453592;
  const heightCm = heightInches * 2.54;

  const totalChangeLbs = Math.abs(goalWeightLbs - currentWeightLbs);
  const weeklyChangeLbs = totalChangeLbs / weeks;

  let bmr: number;
  if (gender === 'male') {
    bmr = 10 * currentKg + 6.25 * heightCm - 5 * ageYears + 5;
  } else {
    bmr = 10 * currentKg + 6.25 * heightCm - 5 * ageYears - 161;
  }

  const tdee = bmr * activityLevel;

  let dailyCalories: number;
  let calorieAdjustment: number;

  if (mode === 'loss') {
    const weeklyDeficit = weeklyChangeLbs * 3500;
    calorieAdjustment = weeklyDeficit / 7;
    dailyCalories = Math.max(tdee - calorieAdjustment, 1200);
  } else {
    const weeklySurplus = weeklyChangeLbs * 2500;
    calorieAdjustment = weeklySurplus / 7;
    dailyCalories = tdee + calorieAdjustment;
  }

  const proteinMultiplier = mode === 'gain' ? 1.0 : 0.8;
  const protein = currentWeightLbs * proteinMultiplier;

  return {
    dailyCalories: Math.round(dailyCalories),
    weeklyChange: Math.round(weeklyChangeLbs * 100) / 100,
    calorieAdjustment: Math.round(calorieAdjustment),
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    protein: Math.round(protein),
  };
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
