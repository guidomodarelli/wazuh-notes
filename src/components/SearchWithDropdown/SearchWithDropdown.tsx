import ChevronDown from "../../assets/icons/ChevronDown";
import SearchIcon from "../../assets/icons/SearchIcon";
import { cn } from '../../utils/cn';
import './index.scss';

interface Props {
  label?: string;
  dropdownButtonText?: string;
  submitButton?: string;
  placeholder?: string;
  dropdownButtons?: string[];
  className?: string;
}

const SearchWithDropdown = (props: Props) => {
  const {
    label,
    dropdownButtonText = 'All',
    submitButton = 'Search',
    placeholder = 'Write here...',
    dropdownButtons = [],
  } = props;
  return (
    <form className={cn("search-with-dropdown", props.className)}>
      <label htmlFor="search-dropdown">{label}</label>
      {dropdownButtons.length > 0 ? (
        <>
          <button id='dropdown-button' data-dropdown-toggle="dropdown" type="button">
            {dropdownButtonText}
            <ChevronDown />
          </button>
          <div id='dropdown' className="hidden">
            <ul aria-labelledby="dropdown-button">
              {dropdownButtons.map((dropdownButton) => (
                <li>
                  <button type="button">{dropdownButton}</button>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
      <div className='input-wrapper'>
        <input
          className={cn([{ 'has-dropdown': dropdownButtons.length > 0 }])}
          type="search"
          id='search-dropdown'
          placeholder={placeholder}
          required
        />
        <button type="submit">
          <SearchIcon />
          <span>{submitButton}</span>
        </button>
      </div>
    </form>
  );
};

export default SearchWithDropdown;
