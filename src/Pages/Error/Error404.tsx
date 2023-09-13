import { FC } from "react";
import { Link } from "react-router-dom";
import { Strings } from "../../Resource/Strings";

const Error404: FC = () => {
  return (
    <div>
      <h1 className="fw-bolder fs-2hx text-gray-900 mb-4">{Strings.oops}</h1>
      <div className="fw-semibold fs-6 text-gray-500 mb-7">
        {Strings.weCanNotFindThatPage}
      </div>
      <div className="mb-0">
        <Link to="/" className="btn btn-sm btn-primary">
          {Strings.returnHome}
        </Link>
      </div>
    </div>
  );
};
export { Error404 };