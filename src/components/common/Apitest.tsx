import { useGetTodosQuery } from '../../redux/slices/ApiSlice';

const Apitest = () => {
  const { data, error, isLoading } = useGetTodosQuery();
  //   console.log(data.todos),
  console.log(error);
  console.log(data);
  console.log(isLoading);
  return <div>hello</div>;
};

export default Apitest;
