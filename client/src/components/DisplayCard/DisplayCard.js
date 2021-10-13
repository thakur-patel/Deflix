import React, { Component } from 'react';

class DisplayCard extends Component {
  render() {
    return (
      <div className="flex items-center w-full h-full">
        <div
          className="flex hover:z-20 w-full h-4/5 bg-center bg-no-repeat bg-contain hover:bg-cover bg-blend-darken transition-all duration-100 ease-linear delay-100 transform hover:scale-125 md:hover:scale-110 cursor-pointer"
          style={{
            backgroundImage: `url('${this.props.item.imgUrl}')`,
          }}
        >
          <div className="top-0 flex-1 p-1 w-full h-full text-black bg-gradient-to-b from-black via-transparent to-black opacity-0 hover:opacity-100 transition-opacity duration-100 ease-linear delay-100 transform select-none">
            <div className="flex flex-col items-start md:p-2 space-y-1 h-full font-medium text-justify">
              {/* title */}
              <div className="w-full text-lg md:text-xl leading-5 md:leading-6 text-gray-100 add-elipses-2">
                {this.props.item.name}
              </div>
              {/* info */}
              <div className="flex justify-start items-center">
                {/* author */}
                <div className="mr-2 text-sm text-gray-100">
                  By SnoopDog
                </div>
              </div>
              {/* description */}
              <div className="justify-self-end mt-auto text-base font-normal leading-5 text-left text-gray-50 add-elipses-3">
                Duration: {this.props.item.duration} mins
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayCard;
