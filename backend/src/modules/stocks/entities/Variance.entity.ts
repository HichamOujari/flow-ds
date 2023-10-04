import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Variance')
export class Variance {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'company' })
  company: string;

  @Column('float', { name: 'highest_price_of_the_day' })
  highestPriceOfTheDay: number;

  @Column('float', { name: 'lowest_price_of_the_day' })
  lowestPriceOfTheDay: number;

  @Column({ type: 'timestamp' })
  timestamp: Date;
}
