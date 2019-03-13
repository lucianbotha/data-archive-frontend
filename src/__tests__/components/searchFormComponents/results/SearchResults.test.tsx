import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import * as React from "react";
import SearchResults from "../../../../components/searchFormComponents/results/SearchResults";

const updateCart = jest.fn();

describe("Search results", () => {
  it("should render", () => {
    expect(
      mount(
        <SearchResults searchResults={[]} cart={[]} updateCart={updateCart} />
      )
    ).toBeDefined();
  });

  it("should create a table even if there is no search results with only the header", () => {
    const wrapper = mount(
      <SearchResults searchResults={[]} cart={[]} updateCart={updateCart} />
    );
    expect(wrapper.find("table.table")).toBeTruthy();
    // only the table header that will be defined
    expect(wrapper.find("tr").length).toEqual(1);
    expect(wrapper.find("thead").length).toEqual(1);
    expect(wrapper.find("td").length).toEqual(0);
  });
  it("should create a table with a some row if there is one observation and a file", () => {
    const observation = {
      files: [
        {
          category: "cat-5",
          dataType: "type-1",
          declination: "20",
          filename: "filename-1",
          instrument: "RSS",
          isReduced: true,
          name: "name-1",
          observationNight: "2010-01-01",
          proposalCode: "code-1",
          rightAscension: "20",
          targetName: "target 001",
          telescope: "SALT",
          url: "./image0.jpg"
        }
      ],
      id: "obsID-1",
      name: "obs1",
      proposal: "Code-1",
      startTime: "2018-02-02 17:55:23",
      telescope: "SALT"
    };
    const wrapper = mount(
      <SearchResults
        searchResults={[observation]}
        cart={[]}
        updateCart={updateCart}
      />
    );
    // row for the observation head
    // row for the observation data
    // row for the file head
    // row for the file data
    expect(wrapper.find("tr").length).toEqual(4);
  });
  it("should render data correctly", () => {
    const observation = [
      {
        files: [
          {
            category: "cat-5",
            dataType: "type-1",
            declination: "20",
            filename: "filename-1",
            instrument: "RSS",
            isReduced: true,
            name: "name-1",
            observationNight: "2010-01-01",
            proposalCode: "code-1",
            rightAscension: "20",
            targetName: "target 001",
            telescope: "SALT",
            url: "./image0.jpg"
          }
        ],
        id: "obsID-1",
        name: "obs1",
        proposal: "Code-1",
        startTime: "2018-02-02 17:55:23",
        telescope: "SALT"
      },
      {
        files: [
          {
            category: "cat-1",
            dataType: "type-2",
            declination: "20",
            filename: "filename-2",
            instrument: "RSS",
            isReduced: true,
            name: "name-2",
            observationNight: "2010-01-01",
            proposalCode: "code-2",
            rightAscension: "20",
            targetName: "target 002",
            telescope: "SALT",
            url: "./image4.jpg"
          }
        ],
        id: "obsID-2",
        name: "obs1",
        proposal: "Code-2",
        startTime: "2018-02-02 17:55:23",
        telescope: "SALT"
      }
    ];
    const wrapper = mount(
      <SearchResults
        searchResults={observation}
        cart={[]}
        updateCart={updateCart}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
