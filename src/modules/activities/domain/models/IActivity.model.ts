export default interface IActivityModel {
  id: string;
  user_id: string;
  time: string;
  type: 'run' | 'bike' | 'swimming';
  date: Date;
  created_at: Date;
  updated_at: Date;
}
