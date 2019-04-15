import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import * as React from "react";
import RSS from "../../../../components/searchFormComponents/instruments/RSS";
import { IRSS } from "../../../../utils/ObservationQueryParameters";

describe("RSS ", () => {
  it("should be defined", () => {
    const onChange = jest.fn();
    expect(
      mount(<RSS rss={{ errors: {}, name: "RSS" }} onChange={onChange} />)
    ).toBeDefined();
  });

  it("should render correctly", () => {
    // Use mount instead of shallow for better snapshots
    const onChange = jest.fn();
    expect(
      toJson(
        mount(<RSS rss={{ errors: {}, name: "RSS" }} onChange={onChange} />)
      )
    ).toMatchSnapshot();
  });

  describe("Fabry-Perot", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, fabryPerotMode: "LR", name: "Fabry Perot" },
        name: "RSS"
      };
      expect(toJson(mount(<RSS rss={rss} onChange={onChange} />)));
    });

    it("should call the onChange method if the Fabry-Perot mode is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, fabryPerotMode: "LR", name: "Fabry Perot" },
        name: "RSS"
      };
      const wrapper = mount(<RSS rss={rss} onChange={onChange} />);
      const fpModeSelect = wrapper.find("FabryPerotModeSelect select");
      fpModeSelect.simulate("change", { target: { value: "HR" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, fabryPerotMode: "HR" }
      });
    });
  });

  describe("Fabry-Perot polarimetry", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          fabryPerotMode: "LR",
          name: "FP polarimetry",
          polarimetryMode: "Linear"
        },
        name: "RSS"
      };
      expect(toJson(mount(<RSS rss={rss} onChange={onChange} />)));
    });

    it("should call the onChange method if the Fabry-Perot mode is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          fabryPerotMode: "LR",
          name: "FP polarimetry",
          polarimetryMode: "Linear"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS rss={rss} onChange={onChange} />);
      const fpModeSelect = wrapper.find("FabryPerotModeSelect select");
      fpModeSelect.simulate("change", { target: { value: "HR" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, fabryPerotMode: "HR" }
      });
    });

    it("should call the onChange method if the polarimetry mode is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          fabryPerotMode: "LR",
          name: "FP polarimetry",
          polarimetryMode: "Linear"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS rss={rss} onChange={onChange} />);
      const polarimetryModeSelect = wrapper.find(
        "PolarimetryModeSelect select"
      );
      polarimetryModeSelect.simulate("change", {
        target: { value: "Circular" }
      });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, polarimetryMode: "Circular" }
      });
    });
  });

  describe("Imaging", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, name: "Imaging" },
        name: "RSS"
      };
      expect(
        toJson(mount(<RSS onChange={onChange} rss={rss} />))
      ).toMatchSnapshot();
    });
  });

  describe("Polarimetric imaging", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          name: "Polarimetric imaging",
          polarimetryMode: "Circular"
        },
        name: "RSS"
      };
      expect(
        toJson(mount(<RSS onChange={onChange} rss={rss} />))
      ).toMatchSnapshot();
    });

    it("should call the onChange method if the polarimetry mode is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          name: "Polarimetric imaging",
          polarimetryMode: "Circular"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const polarimetryModeSelect = wrapper.find(
        "PolarimetryModeSelect select"
      );
      polarimetryModeSelect.simulate("change", {
        target: { value: "Linear Hi" }
      });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, polarimetryMode: "Linear Hi" }
      });
    });
  });

  describe("MOS", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, grating: "pg0900", name: "MOS" },
        name: "RSS"
      };
      expect(
        toJson(mount(<RSS onChange={onChange} rss={rss} />))
      ).toMatchSnapshot();
    });

    it("should call the onChange method if the grating is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, grating: "pg0900", name: "MOS" },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const gratingSelect = wrapper.find("GratingSelect select");
      gratingSelect.simulate("change", { target: { value: "pg1300" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, grating: "pg1300" }
      });
    });
  });

  describe("MOS polarimetry", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          grating: "pg0900",
          name: "MOS polarimetry",
          polarimetryMode: "All Stokes"
        },
        name: "RSS"
      };
      expect(
        toJson(mount(<RSS onChange={onChange} rss={rss} />))
      ).toMatchSnapshot();
    });

    it("should call the onChange method if the grating is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          grating: "pg0900",
          name: "MOS polarimetry",
          polarimetryMode: "All Stokes"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const gratingSelect = wrapper.find("GratingSelect select");
      gratingSelect.simulate("change", { target: { value: "pg1300" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, grating: "pg1300" }
      });
    });

    it("should call the onChange method if the polarimetry mode is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          grating: "pg0900",
          name: "MOS polarimetry",
          polarimetryMode: "All Stokes"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const polarimetrySelect = wrapper.find("PolarimetryModeSelect select");
      polarimetrySelect.simulate("change", { target: { value: "Linear" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, polarimetryMode: "Linear" }
      });
    });
  });

  describe("Spectroscopy", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, grating: "pg0900", name: "Spectroscopy" },
        name: "RSS"
      };
      expect(
        toJson(mount(<RSS onChange={onChange} rss={rss} />))
      ).toMatchSnapshot();
    });

    it("should call the onChange method if the grating is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: { errors: {}, grating: "pg0900", name: "Spectroscopy" },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const gratingSelect = wrapper.find("GratingSelect select");
      gratingSelect.simulate("change", { target: { value: "pg1300" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, grating: "pg1300" }
      });
    });
  });

  describe("Spectropolarimetry", () => {
    it("should render correctly", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          grating: "pg3000",
          name: "Spectropolarimetry",
          polarimetryMode: "Linear Hi"
        },
        name: "RSS"
      };
      expect(
        toJson(mount(<RSS onChange={onChange} rss={rss} />))
      ).toMatchSnapshot();
    });

    it("should call the onChange method if the grating is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          grating: "pg3000",
          name: "Spectropolarimetry",
          polarimetryMode: "Linear Hi"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const gratingSelect = wrapper.find("GratingSelect select");
      gratingSelect.simulate("change", { target: { value: "pg2300" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, grating: "pg2300" }
      });
    });

    it("should call the onChange method if the polarimetry mode is changed", () => {
      const onChange = jest.fn();
      const rss: IRSS = {
        errors: {},
        mode: {
          errors: {},
          grating: "pg0900",
          name: "Spectropolarimetry",
          polarimetryMode: "Linear Hi"
        },
        name: "RSS"
      };
      const wrapper = mount(<RSS onChange={onChange} rss={rss} />);
      const polarimetrySelect = wrapper.find("PolarimetryModeSelect select");
      polarimetrySelect.simulate("change", { target: { value: "All Stokes" } });
      expect(onChange).toHaveBeenCalledWith({
        ...rss,
        mode: { ...rss.mode, polarimetryMode: "All Stokes" }
      });
    });
  });
});
