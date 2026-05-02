import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface TransformationItem {
  id: number;
  clientName: string; // Placeholder usage
  goal: string;
  result: string;
  imageUrl: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}