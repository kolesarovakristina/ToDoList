import { useQuery } from 'react-query';
import { TListItemProps } from '../../types';
import ApiService from '../../common';

import ListItem from '../../components/ListItem';
import Loading from '../../components/Loading';

const Home = () => {
  const { isLoading, data } = useQuery<TListItemProps[], Error>(
    'lists',
    async () => {
      return await ApiService.findAll('/lists');
    }
  );

  if (isLoading) {
    return <Loading />;
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
