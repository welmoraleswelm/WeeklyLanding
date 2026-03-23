export type TicketStatus = 'Completed' | 'Processing' | 'Waiting provider' | 'Failed';

export interface Ticket {
  id: string;
  title: string;
  status: TicketStatus;
  updatedAt: string;
  number: string;
  hasImage?: boolean;
}
