import { memo } from 'react';

import { Input } from '../common';
import actions from './actions';

function NoteSection({ note, dispatch }) {
    return (
        <div>
            <Input
                label="Title"
                typeInput={2}
                placeholder="e.g. Cook's tip"
                value={note.title}
                onChange={(e) => dispatch(actions.setNote({ title: e.target.value }))}
            />
            <Input
                label="Note"
                mb={0}
                textarea
                typeInput={2}
                placeholder="e.g. Try not to over mix the batter. Fold gently..."
                value={note.note}
                onChange={(e) => dispatch(actions.setNote({ content: e.target.value }))}
            />
        </div>
    );
}

export default memo(NoteSection);
