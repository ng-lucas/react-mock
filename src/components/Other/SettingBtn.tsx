export default function SettingBtn(prop: { handleClick: React.MouseEventHandler<HTMLButtonElement> }) {
  const {handleClick} = prop;
  return (
    <div className="col-lg-12">
      <div className="text-center align-items-center">
        <button className="btn btn-warning box-shadow-none py-1 px-5" onClick={handleClick}>SETTING</button>
      </div>
    </div>
  );
}