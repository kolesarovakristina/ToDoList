import { FC, useMemo, useState } from 'react';
import { useQuery } from 'react-query';

import ApiService from 'src/common';
import { useModal } from 'src/hooks/useModal';
import { TListItemProps } from 'src/types';

import Button from 'src/components/_scaffolding/Button';
import Loading from 'src/components/_scaffolding/Loading';

import ListItem from './components/ListItem';

const Home: FC = () => {
  const [Modal, openModal] = useModal(true);
  const [searchValue, setSearchValue] = useState('');

  const { isLoading, isError, error, data } = useQuery<TListItemProps[], Error>(
    'lists',
    async () => {
      return await ApiService.findAll('/lists');
    }
  );

  const filteredTasks = useMemo(() => {
    const normalizedValue = searchValue.toLowerCase().trim();

    if (normalizedValue === '') {
      return data;
    }

    const searchResult = data?.filter(
      (list: TListItemProps) =>
        list.title.toLowerCase().includes(normalizedValue) === true ||
        list.description.toLowerCase().includes(normalizedValue) === true
    );

    return searchResult;
  }, [searchValue, data]);

  const handleSearchOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>{error}</span>;
  }

  if (filteredTasks?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-full">
        <div className="text-3xl font-semibold">No lists to show yet</div>
        <div>Click on the button below to create one</div>
        <Button
          className="btn btn-primary"
          onClick={openModal}
          label="Add list"
        />
        <Modal />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center items-center">
        <input
          type="text"
          name="title"
          id="search-tasks-input"
          placeholder="Search by title or description"
          value={searchValue}
          onChange={handleSearchOnChange}
          className="input input-bordered bg-white w-full lg:w-2/5"
        />
      </div>
      <div className="grid grid-cols-1 md:grid md:grid-cols-3 justify-center items-center gap-5 gap-y-5 py-5 w-full">
        {filteredTasks?.map((item: TListItemProps) => (
          <ListItem
            key={item.idList}
            title={item.title}
            idList={item.idList}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
