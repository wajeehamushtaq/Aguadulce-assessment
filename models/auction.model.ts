import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  createdAt: Date;
}
