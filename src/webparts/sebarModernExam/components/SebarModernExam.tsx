import * as React from "react";
import { ISebarModernExamProps as IProps } from "./ISebarModernExamProps";
import styles from "./SebarModernExam.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";

interface IState {
  employees: any[];
}

export default class SebarModernExam extends React.Component<IProps, IState> {
  state = {
    employees: null,
  };

  public async componentDidMount() {
    sp.setup({
      spfxContext: this.props.context,
    });

    const response = await sp.web.lists.getByTitle("My List").items.get();
    console.log("response", response);
  }
  public render(): React.ReactElement<IProps> {
    return (
      <div className={styles.sebarModernExam}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>

              {/* <h2 className={styles.title}>Most visited USA states:</h2>
            <ul className={styles.statesList}>
              {states !== null &&
                states.map((item: any) => (
                  <li key={item.Id} className={styles.listItem}>
                    <h3>{item.Title}</h3>
                    <p>{item.Description}</p>
                    <p className={styles.itemText}>
                      <span>Best place to visit here:</span>
                      <a
                        href={item.places.Source0}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.places.Title}
                      </a>
                    </p>
                  </li>
                ))}
            </ul>

            <button
              type="button"
              className={styles.addBtn}
              onClick={this.toggleModal}
            >
              Add New State
            </button>

            {modal && (
              <form onSubmit={this.handleSubmit} className={styles.form}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleNameChange}
                  placeholder="State Name"
                  className={styles.formInput}
                ></input>
                <input
                  type="text"
                  name="descr"
                  value={descr}
                  onChange={this.handleDescrChange}
                  placeholder="Description"
                  className={styles.formInput}
                ></input>

                <div>
                  <Select
                    options={options}
                    value={place}
                    onChange={this.handlePlaceChange}
                    placeholder="Best place to visit"
                    autosize={true}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Add
                </button>
              </form>
            )}
          </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
