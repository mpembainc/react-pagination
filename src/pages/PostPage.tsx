import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import PerPageSelection from '../components/PerPageSelection';

const getPosts = (query: { _limit: number; _start: number }) => {
  return axios.get('https://jsonplaceholder.typicode.com/posts', {
    params: query,
  });
};

const PostPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState({ _limit: 10, _start: 0 });

  const { data, isLoading } = useQuery({
    queryKey: ['posts', query],
    queryFn: () => getPosts(query),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='container mt-3'>
      <h3 className='text-center my-4'>
        <strong>REACT PAGINATION</strong>
      </h3>

      <div className='bg-white p-3 mb-5 shadow'>
        <input
          type='search'
          className='form-control mb-2 w-25'
          placeholder='Search'
        />

        <table className='table table-sm table-bordered'>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {data?.data.map((post: any) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  <button className='btn btn-sm btn-success me-1'>edit</button>
                  <button className='btn btn-sm btn-danger'>delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='d-flex justify-content-between align-items-end'>
          <ReactPaginate
            pageCount={Math.ceil(100 / query._limit)}
            forcePage={currentPage}
            containerClassName='pagination mb-0'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            breakClassName='page-item'
            breakLinkClassName='disabled page-link'
            activeClassName='active'
            nextLabel={<i className='bi bi-arrow-right'></i>}
            previousLabel={<i className='bi bi-arrow-left'></i>}
            onPageChange={(selectedItem) => {
              setCurrentPage(selectedItem.selected);
              setQuery({
                ...query,
                _start: selectedItem.selected * query._limit,
              });
            }}
          />
          <PerPageSelection
            perPage={[5, 10, 15, 50, 100]}
            pageSize={query._limit}
            onChange={(pageSize) => {
              setCurrentPage(0);
              setQuery({ _limit: pageSize, _start: 0 });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
