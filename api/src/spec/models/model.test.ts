import Act from '../../models/acts';
import mongoose from 'mongoose';
import '../mongodb_helper'
// import 'jest';
// import { DropCollectionOptions } from 'mongodb';

describe('Act', () => {

  beforeEach(() => {
    mongoose.connection.collections.acts.drop();
  });  

  it('should create an act', async () => {
    const act = await Act.create({
      name: 'Elton John',
      stage: 'Pyramid',
      date: '2023-06-24',
      start: 2200,
      end: 2330
    });
    expect(act.name).toEqual('Elton John');
    expect(act.stage).toEqual('Pyramid');
    expect(act.date).toEqual(new Date("2023-06-24"));
    expect(act.start).toEqual(2200);
    expect(act.end).toEqual(2330);
  });

});