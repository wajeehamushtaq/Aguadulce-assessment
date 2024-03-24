import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "float",
  })
  value: number;

  @Column()
  auctionID: number;

  @Column()
  bidder: string;
}
