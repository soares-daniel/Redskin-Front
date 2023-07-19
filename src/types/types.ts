
export type Event = {
    id: number;
    title: string;
    start: Date;
    end: Date;
    extendedProps: {
      description: string;
      createdBy: string;
      eventType: string;
      createdAt: Date;
      updatedAt: Date;
      classNames?: string;
    };
};