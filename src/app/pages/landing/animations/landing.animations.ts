import { animate, state, style, transition, trigger } from '@angular/animations';

const baseParams = {
  params: {
    duration: 520,
    delay: 0,
  },
};

export const fadeUp = trigger('fadeUp', [
  state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
  state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
  transition('hidden => visible', [
    animate('{{duration}}ms {{delay}}ms ease-out'),
  ], baseParams),
]);

export const fadeLeft = trigger('fadeLeft', [
  state('hidden', style({ opacity: 0, transform: 'translateX(-24px)' })),
  state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('hidden => visible', [
    animate('{{duration}}ms {{delay}}ms ease-out'),
  ], baseParams),
]);

export const fadeRight = trigger('fadeRight', [
  state('hidden', style({ opacity: 0, transform: 'translateX(24px)' })),
  state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
  transition('hidden => visible', [
    animate('{{duration}}ms {{delay}}ms ease-out'),
  ], baseParams),
]);

export const scaleIn = trigger('scaleIn', [
  state('hidden', style({ opacity: 0, transform: 'scale(0.96)' })),
  state('visible', style({ opacity: 1, transform: 'scale(1)' })),
  transition('hidden => visible', [
    animate('{{duration}}ms {{delay}}ms ease-out'),
  ], baseParams),
]);

