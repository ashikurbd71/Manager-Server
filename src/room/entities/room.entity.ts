import { MemberEntity } from "src/members/entities/member.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({ name: "tbl_room" })
export class RoomEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => MemberEntity, (ins) => ins.roomonename, { nullable: true })
    @JoinColumn()
    studentOne: MemberEntity;

    @ManyToOne(() => MemberEntity, (ins) => ins.roomtwoname, { nullable: true })
    @JoinColumn()
    studentTwo: MemberEntity;

    @Column()
    roomNumber: string;

    @Column()
    floor: string;

    @Column({ default: 0 })
    count: number;

    @Column()
    price: string;



    @Column()
    seat: number;

    // Lifecycle hooks to update the count before insert or update operations
    @BeforeInsert()
    @BeforeUpdate()
    updateCount() {
        this.count = 0;
        if (this.studentOne) this.count += 1;
        if (this.studentTwo) this.count += 1;
    }
}
