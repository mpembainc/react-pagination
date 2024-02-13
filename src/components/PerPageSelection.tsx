type Props = {
  perPage: number[];
  pageSize: number;
  onChange: (pageSize: number) => void;
};

const PerPageSelection = ({ onChange, pageSize, perPage }: Props) => {
  return (
    <label>
      Per Page:{' '}
      <select
        onChange={(e) => onChange(+e.target.value)}
        className='form-select form-select-sm'
        value={pageSize}
        style={{
          width: 'auto',
          display: 'inline-block',
        }}
      >
        {perPage.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
};

export default PerPageSelection;
