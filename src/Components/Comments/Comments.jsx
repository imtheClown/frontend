import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";
import styles from '../Comments/Comments.module.css';


export function Comments(props) {
  const user_name = props.user_name
  const content = props.content

  return (
    
    <div className={styles.comment}>
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>

          <header>
            <div className={styles.authorAndTime}>
              <strong>{user_name}</strong>
            </div>
          </header>

          <p>{content}</p>
        </div>

      </div>
    </div>
  );
}
