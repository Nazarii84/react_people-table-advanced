/* eslint-disable jsx-a11y/control-has-associated-label */
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { Person } from '../types/Person';

type Props = {
  people: Person[];
  selectedSlug?: string | null;
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const handleSort = (field: 'name' | 'sex' | 'born' | 'died') => {
    let newSort: string | null = sort;
    let newOrder: string | null = order;

    if (sort !== field) {
      newSort = field;
      newOrder = null;
    } else if (!order) {
      newSort = field;
      newOrder = 'desc';
    } else {
      newSort = null;
      newOrder = null;
    }

    const newSearch = getSearchWith(searchParams, {
      sort: newSort,
      order: newOrder,
    });

    setSearchParams(newSearch);
  };

  const getSortIcon = (field: 'name' | 'sex' | 'born' | 'died') => {
    if (sort !== field) {
      return 'fas fa-sort';
    }

    if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort-up';
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('name')}
              >
                <span className="icon">
                  <i className={getSortIcon('name')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('sex')}
              >
                <span className="icon">
                  <i className={getSortIcon('sex')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('born')}
              >
                <span className="icon">
                  <i className={getSortIcon('born')} />
                </span>
              </button>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <button
                type="button"
                className="button is-white p-0 ml-1"
                onClick={() => handleSort('died')}
              >
                <span className="icon">
                  <i className={getSortIcon('died')} />
                </span>
              </button>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const nameClass =
            person.sex === 'f' ? 'has-text-danger' : 'has-text-link';

          const isSelected = person.slug === selectedSlug;

          const motherPerson = people.find(p => p.name === person.motherName);
          const fatherPerson = people.find(p => p.name === person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={isSelected ? 'has-background-warning' : ''}
            >
              <td>
                <a href={`#/people/${person.slug}`} className={nameClass}>
                  {person.name}
                </a>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {person.motherName ? (
                  motherPerson ? (
                    <a
                      href={`#/people/${motherPerson.slug}`}
                      className={
                        motherPerson.sex === 'f'
                          ? 'has-text-danger'
                          : 'has-text-link'
                      }
                    >
                      {motherPerson.name}
                    </a>
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>

              <td>
                {person.fatherName ? (
                  fatherPerson ? (
                    <a
                      href={`#/people/${fatherPerson.slug}`}
                      className={
                        fatherPerson.sex === 'f'
                          ? 'has-text-danger'
                          : 'has-text-link'
                      }
                    >
                      {fatherPerson.name}
                    </a>
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
