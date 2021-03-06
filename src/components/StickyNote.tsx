import * as React from 'react';
import { Note } from 'domain/Note';
import TagLink from 'components/TagLink';
import { ago } from 'utils/DateTime';

interface StickyNoteProps {
  note: Note;
  removeNote: (oldNoteId: string) => void;
}
const isLikeNotYet = (id: string, fansIds: string[]): boolean => {
  return fansIds.indexOf(id) === -1;
};
const minuteAgo = (updated: number) => {
  return ago(updated, 'minute');
};

const stickyNote: React.SFC<StickyNoteProps> = ({
  note,
  removeNote = () => {}
}) => {
  const { noteId, user, noteContents, image } = note;
  return (
    <div className="column">
      <div className="card">
        <header className="card-header has-text-centered is-Loading">
          {noteContents.isUpdating ? (
            <p
              className="card-header-title"
              style={{ backgroundColor: '#74d76d', color: '#FFFFFF' }}
            >
              <span className="icon">
                <i className="fas fa-spinner fa-spin" />
              </span>
              更新しています
            </p>
          ) : (
            ''
          )}
        </header>
        <div
          className="card-content"
          style={{ backgroundColor: noteContents.color }}
        >
          <div className="media">
            <div className="media-left">
              <figure className={`image is-${image.size}x${image.size}`}>
                <img src={image.url} alt={image.title} />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-7">
                {user.name} - {minuteAgo(noteContents.updated)}
                分前
              </p>
              <p className="subtitle is-7">@{user.id}</p>
            </div>
          </div>
          <div className="content">{noteContents.comment}</div>
          <div className="content">
            <div className="field is-grouped is-grouped-multiline">
              {noteContents.tagTitles.map((title, index) => (
                <TagLink
                  key={title}
                  index={index}
                  tagTitle={title}
                  size="is-small"
                />
              ))}
            </div>
          </div>
        </div>
        <footer
          className="card-footer"
          style={{ backgroundColor: noteContents.color }}
        >
          <a href="#" className="card-footer-item">
            <span className="icon">
              {isLikeNotYet(user.id, noteContents.fansIds) ? (
                <i className="far fa-heart" />
              ) : (
                <i className="fas fa-heart" />
              )}
            </span>
            <span>{noteContents.fansIds.length}</span>
          </a>
          {noteContents.editable ? (
            <a
              href="#"
              className="card-footer-item"
              onClick={e => removeNote(noteId)}
            >
              <span className="icon">
                <i className="fas fa-trash-alt" />
              </span>
            </a>
          ) : (
            ''
          )}
        </footer>
      </div>
    </div>
  );
};

export default stickyNote;
