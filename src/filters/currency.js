export const formatDollars = dollars => (+dollars).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export const formatCents = cents => formatDollars(cents / 100);
