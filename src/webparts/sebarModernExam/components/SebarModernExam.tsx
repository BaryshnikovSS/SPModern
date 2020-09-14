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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
