import { useMemo } from 'react';

import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import { dateFormat } from '@/modules/activities/presentation/utils/dateFormat';

interface ItemProps {
  activity: IActivityModel;
}

const Item = ({ activity }: ItemProps) => {
  const date = useMemo(() => dateFormat(activity.date), [activity.date]);

  return (
    <article className="w-full flex sm:flex-col">
      <div className="flex flex-col">
        <strong>Tipo</strong>
        <span>{activity.type}</span>
      </div>
      <div className="flex flex-col">
        <strong>Tempo</strong>
        <time>{activity.time}</time>
      </div>
      <div className="flex flex-col">
        <strong>Data</strong>
        <time>{date}</time>
      </div>
    </article>
  );
};

export default Item;
