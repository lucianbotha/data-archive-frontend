import * as _ from "lodash";
import * as React from "react";
import {
  CalibrationType,
  IGeneral,
  ISearchFormState,
  ITarget,
  ITelescope
} from "../utils/ObservationQueryParameters";
import { TargetType } from "../utils/TargetType";
import { isError } from "../utils/validators";
import {
  ButtonGrid,
  DataGrid,
  ParentGrid,
  ProposalGrid,
  Spinner,
  TargetGrid,
  TelescopeGrid
} from "./basicComponents/Grids";
import { fakeSearchResults } from "./fakeSearchResults";
import DataForm from "./searchFormComponents/DataForm";
import ProposalForm, {
  validatedProposal
} from "./searchFormComponents/ProposalForm";
import DataKeys from "./searchFormComponents/results/DataKeys";
import SearchResultsTable from "./searchFormComponents/results/SearchResultsTable";
import TargetForm, { validatedTarget } from "./searchFormComponents/TargetForm";
import TelescopeForm, {
  validatedTelescope
} from "./searchFormComponents/TelescopeForm";

interface ISearchFormProps {
  cache?: ISearchFormCache;
  screenDimensions: { innerHeight: number; innerWidth: number };
}

/**
 * The cache for the search form.
 *
 * The general and target details (and errors) are cached.
 */
export interface ISearchFormCache {
  general?: IGeneral;
  target?: ITarget;
  telescope?: ITelescope;
}

/**
 * A form for defining search parameters for an observation search, and for
 * initiating the search.
 */
class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
  public state: ISearchFormState = {
    general: { calibrations: new Set<CalibrationType>(), errors: {} },
    loading: false,
    results: [],
    target: {
      errors: {},
      resolver: "Simbad",
      searchConeRadius: "",
      searchConeRadiusUnits: "arcseconds",
      targetTypes: new Set<TargetType>()
    }
  };

  /**
   * Populate the state from cached values.
   */
  componentDidMount() {
    this.setState(() => (this.props.cache as any) || {});
  }

  /**
   * Handle changes of telescope-related parameters.
   */
  public telescopeChange = (value: ITelescope) => {
    const newState = {
      ...this.state,
      telescope: {
        ...value
      }
    };
    this.updateState(newState);
  };

  /**
   * Handle changes of target-related parameters.
   */
  public targetChange = (value: ITarget) => {
    const newState = {
      ...this.state,
      target: {
        ...value
      }
    };
    this.updateState(newState);
  };

  /**
   * Handle changes of general parameters.
   */
  public generalChange = (value: IGeneral) => {
    const newState = {
      ...this.state,
      general: {
        ...value
      }
    };
    this.updateState(newState);
  };

  /**
   * Perform an observation with the currently selected search parameters.
   */
  public searchArchive = async () => {
    this.updateState({
      ...this.state,
      loading: true
    });

    // Add errors to the search parameter details
    const target = await validatedTarget(this.state.target);
    const general = await validatedProposal(this.state.general);
    const telescope = await validatedTelescope(this.state.telescope);
    this.updateState({
      ...this.state,
      general,
      loading: false,
      target,
      telescope
    });
    if (
      !isError(
        general.errors,
        target.errors,
        (telescope && telescope.errors) || {}
      )
    ) {
      // TODO query the server
      this.setState(() => ({
        ...this.state,
        results: fakeSearchResults(2000)
      }));
    }
    this.setState(() => ({
      ...this.state,
      loading: false
    }));
  };

  public render() {
    const { target, general, telescope, loading, results } = this.state;
    const { screenDimensions } = this.props;

    // The search form is a child of a Bulma container div element. The width of
    // this div depends on the screen size. We let the results table extend
    // horizontally beyond this div, so that no space is wasted. We keep a left
    // and right margin of 50 pixels around the table.
    const resultsTableMargin = 50;
    const maxResultsTableWidth =
      screenDimensions.innerWidth - 2 * resultsTableMargin;
    let containerDivWidth =
      screenDimensions.innerWidth - 2 * resultsTableMargin;
    if (window.matchMedia("(min-width: 1088px)").matches) {
      containerDivWidth = 960;
    }
    if (window.matchMedia("(min-width: 1280px)").matches) {
      containerDivWidth = 1152;
    }
    if (window.matchMedia("(min-width: 1472px)").matches) {
      containerDivWidth = 1344;
    }

    // The table margin will in general be negative so that the div extends
    // beyond the container div. However, if it isn't, we center the table.
    const resultsTableContainerMargin =
      containerDivWidth - maxResultsTableWidth < 0
        ? (containerDivWidth - maxResultsTableWidth) / 2
        : "auto";

    return (
      <>
        {loading && (
          <div className="dimScreen">
            <Spinner />
          </div>
        )}
        <ParentGrid>
          <TargetGrid>
            <TargetForm target={target} onChange={this.targetChange} />
          </TargetGrid>
          <ProposalGrid>
            <ProposalForm proposal={general} onChange={this.generalChange} />
          </ProposalGrid>
          <TelescopeGrid>
            <TelescopeForm
              telescope={telescope}
              onChange={this.telescopeChange}
            />
          </TelescopeGrid>
          <DataGrid>
            <DataForm general={general} onChange={this.generalChange} />
          </DataGrid>
          <ButtonGrid>
            <button
              disabled={loading}
              className="button is-primary"
              data-test="search-button"
              type="button"
              value="Search"
              onClick={this.searchArchive}
            >
              search
            </button>
          </ButtonGrid>
        </ParentGrid>
        {results && results.length !== 0 && (
          <div
            style={{
              marginLeft: resultsTableContainerMargin,
              marginRight: resultsTableContainerMargin,
              width: maxResultsTableWidth
            }}
          >
            <SearchResultsTable
              columns={[
                DataKeys.OBSERVATION_NAME,
                DataKeys.PROPOSAL_CODE,
                DataKeys.RIGHT_ASCENSION,
                DataKeys.DECLINATION,
                DataKeys.OBSERVATION_NAME,
                DataKeys.PROPOSAL_CODE,
                DataKeys.RIGHT_ASCENSION,
                DataKeys.DECLINATION,
                DataKeys.OBSERVATION_NAME,
                DataKeys.PROPOSAL_CODE,
                DataKeys.RIGHT_ASCENSION,
                DataKeys.DECLINATION
              ]}
              maxWidth={maxResultsTableWidth}
              searchResults={results}
            />
          </div>
        )}
      </>
    );
  }

  /**
   * Update the form state and the cache.
   */
  private updateState = (update: object) => {
    this.setState(
      () => update,
      () => {
        if (this.props.cache) {
          this.props.cache.general = _.cloneDeep(this.state.general);
          this.props.cache.target = _.cloneDeep(this.state.target);
          this.props.cache.telescope = _.cloneDeep(this.state.telescope);
        }
      }
    );
  };
}

export default SearchForm;
