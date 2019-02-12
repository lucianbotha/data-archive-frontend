import * as React from "react";

class LesediForm extends React.Component<any, any> {
  public render() {
    return <h2>LESEDI</h2>;
  }
}

class RSSForm extends React.Component<any, any> {
  onChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    this.props.onChange(e.target.name, e.target.value);
  };

  render() {
    const rss = this.props.rss || {};
    const binnedRows = rss.binnedRows || "";
    const binnedColumns = rss.binnedColumns || "";
    const filter = rss.filter || "";

    return (
      <>
        <label>
          Binned rows:
          <input
            name="binnedRows"
            value={binnedRows}
            onChange={this.onChange}
          />
        </label>
        <label>
          Binned columns:
          <input
            name="binnedColumns"
            value={binnedColumns}
            onChange={this.onChange}
          />
        </label>
        <label>
          Filter:
          <select name="filter" value={filter} onChange={this.onChange}>
            <option value="">Any</option>
            <option value="Filter 1">Filter 1</option>
            <option value="Filter 2">Filter 2</option>
          </select>
        </label>
      </>
    );
  }
}

class HRSForm extends React.Component<any, any> {
  public render() {
    return <h2>HRS</h2>;
  }
}

class SALTForm extends React.Component<any, any> {
  private onInstrumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const details = this.props.details || {};
    const instrument = details.instrument || {};
    this.props.onChange("instrument", {
      name: e.target.value
    });
  };

  private onInstrumentDetailsChange = (name: string, value: any) => {
    const details = this.props.details || {};
    const instrument = details.instrument || {};
    this.props.onChange("instrument", {
      ...instrument,
      details: {
        ...instrument.details,
        [name]: value
      }
    });
  };

  public render() {
    const details = this.props.details || {};
    const instrument = details.instrument || {};

    return (
      <>
        <select value={instrument.name} onChange={this.onInstrumentChange}>
          <option key="Any" value="">
            Any
          </option>
          <option key="HRS" value="HRS">
            HRS
          </option>
          <option key="RSS" value="RSS">
            RSS
          </option>
        </select>
        {instrument.name === "HRS" && <HRSForm />}
        {instrument.name === "RSS" && (
          <RSSForm
            rss={instrument.details}
            onChange={this.onInstrumentDetailsChange}
          />
        )}
      </>
    );
  }
}

class TelescopeForm extends React.Component<any, any> {
  private telescopes = ["Lesedi", "SALT"];

  public render() {
    return (
      <>
        <select
          value={this.props.telescope.name}
          onChange={this.onTelescopeChange}
        >
          <option key={"Any"} value="">
            Any
          </option>
          {this.telescopes.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {this.props.telescope.name === "Lesedi" && (
          <LesediForm
            onChange={this.onTelescopeDetailsChange}
            details={this.props.telescope.details}
          />
        )}
        {this.props.telescope.name === "SALT" && (
          <SALTForm
            onChange={this.onTelescopeDetailsChange}
            details={this.props.telescope.details}
          />
        )}
      </>
    );
  }

  private onTelescopeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e, e.target);
    this.props.onChange("telescope", {
      name: e.target.value
    });
  };

  private onTelescopeDetailsChange = (name: string, value: any) => {
    this.props.onChange("telescope", {
      ...this.props.telescope,
      details: {
        ...this.props.telescope.details,
        [name]: value
      }
    });
  };
}

class SearchForm extends React.Component<any, any> {
  public state = {
    telescope: {}
  };

  private onChange = (name: string, value: any) => {
    this.setState(
      (prevState: any) => ({
        ...prevState,
        [name]: value
      }),
      () => console.log("STATE...", this.state)
    );
  };

  public render() {
    return (
      <TelescopeForm
        onChange={this.onChange}
        telescope={this.state.telescope}
      />
    );
  }
}

export default SearchForm;
