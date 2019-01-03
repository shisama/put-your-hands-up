import * as React from 'react';
import { Note, NoteMap } from 'domain/Note';
import StickyNote from './StickyNote';
import InputForm from 'containers/InputForm';
import ConfirmModal from 'containers/ConfirmModal';

export interface CommentsBoardProps {
  notes?: NoteMap;
}

const commentsborad: React.SFC<CommentsBoardProps> = ({ notes = {} }) => (
  <div className="columns is-desktop">
    {createList(notes).map((note, index) => (
      <StickyNote key={index} note={note} removeNote={f} />
    ))}
    <ConfirmModal
      isActive={false}
      message="本当に削除してよろしいですか？"
      ok={f}
      cancel={f}
    />
    <InputForm />
  </div>
);

const createList = (notes: NoteMap): Note[] => {
  if (notes === {}) {
    return [];
  }
  const noteList: Note[] = [];
  Object.keys(notes).map(key => {
    noteList.push(notes[key]);
  });
  return noteList;
};

const f = () => {};

export default commentsborad;
