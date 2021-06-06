import { useMemo } from 'react';

import IActivityModel from '@/modules/activities/domain/models/IActivity.model';
import { dateFormat } from '@/modules/activities/presentation/utils/dateFormat';
import { parsedType } from '@/modules/activities/presentation/utils/parsedType';

interface ItemProps {
  activity: IActivityModel;
}

const Item = ({ activity }: ItemProps) => {
  const date = useMemo(() => dateFormat(activity.date), [activity.date]);
  const type = parsedType(activity.type);

  return (
    <article className="w-full sm:flex sm:flex-row text-gray-400 pt-3 pb-6 border-b-2 border-gray-400">
      <div className="flex flex-1 flex-col mt-4">
        <strong>Tipo</strong>
        <span>{type}</span>
      </div>
      <div className="flex flex-1 flex-col mt-3">
        <strong>Tempo</strong>
        <time>{activity.time}</time>
      </div>
      <div className="flex flex-1 flex-col mt-3">
        <strong>Data</strong>
        <time>{date}</time>
      </div>
    </article>
  );
};

export default Item;
