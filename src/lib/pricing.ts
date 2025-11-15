export type BookingDuration = 'hourly' | 'daily' | 'monthly';

export interface PricingTier {
  hourly: number;
  daily: number;
  monthly: number;
}

export const PRICING_TIERS: Record<string, PricingTier> = {
  'open-desk': {
    hourly: 10,
    daily: 50,
    monthly: 800,
  },
  'private-office': {
    hourly: 25,
    daily: 150,
    monthly: 2500,
  },
  'meeting-room': {
    hourly: 40,
    daily: 200,
    monthly: 3500,
  },
};

export const RESOURCE_PRICES: Record<string, number> = {
  projector: 15,
  whiteboard: 5,
  parking: 10,
  lockers: 8,
  printer: 12,
};

export const PEAK_HOUR_MULTIPLIER = 1.3;
export const PEAK_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export function calculatePrice(
  spaceType: string,
  duration: BookingDuration,
  hours: number,
  selectedResources: string[],
  startHour?: number
): number {
  const basePricing = PRICING_TIERS[spaceType];
  if (!basePricing) return 0;

  let basePrice = 0;

  switch (duration) {
    case 'hourly':
      basePrice = basePricing.hourly * hours;
      // Apply peak hour pricing
      if (startHour !== undefined && PEAK_HOURS.includes(startHour)) {
        basePrice *= PEAK_HOUR_MULTIPLIER;
      }
      break;
    case 'daily':
      basePrice = basePricing.daily;
      break;
    case 'monthly':
      basePrice = basePricing.monthly;
      break;
  }

  // Add resource costs
  const resourceCost = selectedResources.reduce((total, resource) => {
    return total + (RESOURCE_PRICES[resource] || 0);
  }, 0);

  return basePrice + resourceCost;
}
