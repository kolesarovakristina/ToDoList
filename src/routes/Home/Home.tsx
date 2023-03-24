import { useQuery } from 'react-query';
import { TListItemProps } from '../../types';
import ApiService from '../../common';

import ListItem from '../../components/ListItem';

const Home = () => {
  const { isLoading, data } = useQuery<TListItemProps[], Error>(
    'query-lists',
    async () => {
      return await ApiService.findAllLists('/lists');
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-3 justify-center items-center gap-5 gap-y-5">
      {data?.map((item) => (
        <ListItem
          key={item.idList}
          title={item.title}
          idList={item.idList}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Home;
