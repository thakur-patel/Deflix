import React, { Component } from 'react';
const starJsx = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3"
    viewBox="0 0 20 20"
    fill="yellow"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

class Moviecard extends Component {
  render() {
    return (
      <div className="flex items-center w-full h-full">
        <div
          className="flex hover:z-20 w-full h-4/5 bg-center bg-no-repeat bg-contain hover:bg-cover bg-blend-darken transition-all duration-100 ease-linear delay-100 transform hover:scale-125 md:hover:scale-110 cursor-pointer"
          style={{
            backgroundImage: `url('${this.props.movie.imgUrl}')`,
          }}
        >
          <div className="top-0 flex-1 p-1 w-full h-full text-black bg-gradient-to-b from-black via-transparent to-black opacity-0 hover:opacity-100 transition-opacity duration-100 ease-linear delay-100 transform select-none">
            <div className="flex flex-col items-start md:p-2 space-y-1 h-full font-medium text-justify">
              {/* title */}
              <div className="w-full text-lg md:text-xl leading-5 md:leading-6 text-gray-100 add-elipses-2">
                {this.props.movie.name}
              </div>
              {/* info */}
              <div className="flex justify-start items-center">
                {/* year */}
                <div className="mr-2 text-sm text-gray-100">
                  {this.props.movie.year}
                </div>
                {/* rating */}
                <div className="flex items-center px-1 text-xs text-gray-50 bg-gray-700 border-2 border-gray-300">
                  <div>{this.props.movie.rating}</div>
                  <div>{starJsx}</div>
                </div>
              </div>
              {/* description */}
              <div className="justify-self-end mt-auto text-base font-normal leading-5 text-left text-gray-50 add-elipses-3">
                Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Fuga repellat, dolores maiores reiciendis sunt
                odit, nihil eligendi sint amet ipsam mollitia commodi
                itaque voluptatibus quia hic ducimus, eaque quos
                tenetur.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Moviecard;
