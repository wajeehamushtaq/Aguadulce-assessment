import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Auction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "float",
  })
  value: number;

  @Column()
  bidder: string;
}
