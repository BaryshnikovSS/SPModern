import * as React from "react";
import { sp } from "@pnp/sp/presets/all";
import scss from "./SebarModernExam.module.scss";
import { ISebarModernExamProps as IProps } from "./ISebarModernExamProps";

interface IState {
  contacts: Object[];
  name: string;
  number: string;
  filter: string;
}

export default class SebarModernExam extends React.Component<IProps, IState> {
  public state: any = {
    contacts: [],
    name: "",
    createdDate: "",
  };

  public async componentDidMount() {
    sp.setup({
      spfxContext: this.props.context,
    });

    const response = await sp.web.lists
      .getByTitle("Main(exam)")
      .items.select("Id", "Title", "Created")
      .get();

    const result = response.reduce((acc, el) => {
      const { Id, Title, Created } = el;
      acc.push({ id: Id, name: Title, createdDate: Created });
      return acc;
    }, []);

    this.setState({ contacts: [...result] });
  }

  public handleFormChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log("e.target.name", e.target.name);
    // this.setState({ [name]: value });
  };

  public handleFormSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name: this.state.name,
      createdDate: this.state.createdDate,
    };
  };

  public handleDeleteSubmit = (e) =>
    this.setState({
      contacts: this.state.contacts.filter((el) => el.id !== e.target.id),
    });

  public render(): React.ReactElement<IProps> {
    const { contacts, name, createdDate } = this.state;
    return (
      <>
        <div className={scss.sebarModernExam}>
          <div className={scss.container}>
            <div className={scss.row}>
              <h2 style={{ padding: "16px 0" }}>Phonebook</h2>
              <form className={scss.form} onSubmit={this.handleFormSubmit}>
                <h3>Name</h3>
                <input
                  type="text"
                  name="name"
                  onChange={this.handleFormChange}
                  value={name}
                />
                <h3>Date created</h3>
                <input
                  type="text"
                  name="createdDate"
                  onChange={this.handleFormChange}
                  value={createdDate}
                />
                <button type="submit">Add contact</button>
              </form>
              <h2 style={{ padding: "16px 0" }}>Contacts</h2>
              <ul>
                {contacts.map((el) => (
                  <li className={scss.list} key={el.Id}>
                    <p>
                      {el.name}: <span>{el.createdDate}</span>
                    </p>
                    <button
                      type="button"
                      id={el.Id}
                      onClick={this.handleDeleteSubmit}
                    >
                      delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
