<template>
	<div>
		<editor class="editor" :extensions="extensions">

			<div class="menubar" slot="menubar" slot-scope="{ nodes, marks }">
				<div v-if="nodes && marks">

					<button
						class="menubar__button"
						:class="{ 'is-active': marks.bold.active() }"
						@click="marks.bold.command"
					>
						<icon name="bold" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': marks.italic.active() }"
						@click="marks.italic.command"
					>
						<icon name="italic" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': marks.strike.active() }"
						@click="marks.strike.command"
					>
						<icon name="strike" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': marks.underline.active() }"
						@click="marks.underline.command"
					>
						<icon name="underline" />
					</button>

					<button
						class="menubar__button"
						@click="marks.code.command"
						:class="{ 'is-active': marks.code.active() }
					">
						<icon name="code" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.paragraph.active() }"
						@click="nodes.paragraph.command"
					>
						<icon name="paragraph" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.heading.active({ level: 1 }) }"
						@click="nodes.heading.command({ level: 1 })"
					>
						h1
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.heading.active({ level: 2 }) }"
						@click="nodes.heading.command({ level: 2 })"
					>
						h2
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.heading.active({ level: 3 }) }"
						@click="nodes.heading.command({ level: 3 })"
					>
						h3
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.bullet_list.active() }"
						@click="nodes.bullet_list.command"
					>
						<icon name="ul" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.ordered_list.active() }"
						@click="nodes.ordered_list.command"
					>
						<icon name="ol" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.blockquote.active() }"
						@click="nodes.blockquote.command"
					>
						<icon name="quote" />
					</button>

					<button
						class="menubar__button"
						:class="{ 'is-active': nodes.code_block.active() }"
						@click="nodes.code_block.command"
					>
						<icon name="code" />
					</button>

					<button
						class="menubar__button"
						@click="showImagePrompt(nodes.image.command)"
					>
						<icon name="image" />
					</button>
				</div>
			</div>

			<div class="editor__content" slot="content" slot-scope="props" style="" @input="onChange">
				
			</div>

		</editor>
	</div>
</template>

<script>
import { Editor } from 'tiptap'
import {
	// Nodes
	BlockquoteNode,
	BulletListNode,
	CodeBlockNode,
	CodeBlockHighlightNode,
	HardBreakNode,
	HeadingNode,
	ImageNode,
	ListItemNode,
	OrderedListNode,
	TodoItemNode,
	TodoListNode,

	// Marks
	BoldMark,
	CodeMark,
	ItalicMark,
	LinkMark,
	StrikeMark,
	UnderlineMark,

	// General Extensions
	HistoryExtension,
	PlaceholderExtension,
} from 'tiptap-extensions'
import {ConnectItem} from 'tg-turing'
import Icon from '../src/icons';
export default {
    name:"antd-fc-editor",
    extends: ConnectItem,
    data() {
		return {
			extensions: [
				new BlockquoteNode(),
				new BulletListNode(),
				new CodeBlockNode(),
				new HardBreakNode(),
				new HeadingNode({ maxLevel: 3 }),
				new ImageNode(),
				new ListItemNode(),
				new OrderedListNode(),
				new TodoItemNode(),
				new TodoListNode(),
				new BoldMark(),
				new CodeMark(),
				new ItalicMark(),
				new LinkMark(),
				new StrikeMark(),
				new UnderlineMark(),
				new HistoryExtension(),
				new PlaceholderExtension(),
			],
		}
	},
    methods:{
        onChange(value){
            let label = value;
            this.$emit("on-item-change", this.name, value.data, label.data, this.model)
            this.$emit("input", value.data)
        },
		showImagePrompt(command) {
			const src = prompt('Enter the url of your image here')
			if (src !== null) {
				command({ src })
			}
		},
    },
    components: {
        Editor,
        Icon,
    }
}
</script>

<style>
.ProseMirror.ProseMirror-focused {
	padding: 2px;
}
.page__content {
  padding: 4rem 1rem;
}
.page__footer {
  text-align: center;
  margin-bottom: 2rem;
}
.page__source-link {
  display: inline-block;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.1);
  color: #000000;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
}
.editor {
  position: relative;

  margin: 0 auto 0rem auto;
}
.editor__content {
	border: solid 1px #ddd;
}
.editor__content > div {
	min-height:100px;
}
.editor__content pre {
    padding: 0.7rem 1rem;
    border-radius: 5px;
    background: #000000;
    color: #ffffff;
    font-size: 0.8rem;
    overflow-x: auto;
}
.editor__content pre code {
      display: block;
}
.editor__content p code {
    display: inline-block;
    padding: 0 0.4rem;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
}
.editor__content ul,
  .editor__content ol {
    padding-left: 1rem;
}
.editor__content a {
    color: inherit;
}
.editor__content blockquote {
    border-left: 3px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.8);
    padding-left: 0.8rem;
    font-style: italic;
}
.editor__content blockquote p {
      margin: 0;
}
.editor__content img {
    max-width: 100%;
    border-radius: 3px;
}
.menububble {
  position: absolute;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 20;
  background: #000000;
  border-radius: 5px;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  -webkit-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
          transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  -webkit-transition: opacity 0.2s, visibility 0.2s;
  transition: opacity 0.2s, visibility 0.2s;
}
.menububble__button {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #ffffff;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
.menububble__button:last-child {
      margin-right: 0;
}
.menububble__button:hover {
      background-color: rgba(255, 255, 255, 0.1);
}
.menububble__button.is-active {
      background-color: rgba(255, 255, 255, 0.2);
}
.menububble__form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
}
.menububble__input {
    font: inherit;
    border: none;
    background: transparent;
    color: #ffffff;
}
.menubar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 1rem;
  -webkit-transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
  transition: visibility 0.2s 0.4s, opacity 0.2s 0.4s;
}
.menubar.is-hidden {
    visibility: hidden;
    opacity: 0;
}
.menubar.is-focused {
    visibility: visible;
    opacity: 1;
    -webkit-transition: visibility 0.2s, opacity 0.2s;
    transition: visibility 0.2s, opacity 0.2s;
}
.menubar__button {
    font-weight: bold;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    background: transparent;
    border: 0;
    color: #000000;
    padding: 0.2rem 0.5rem;
    margin-right: 0.2rem;
    border-radius: 3px;
    cursor: pointer;
}
.menubar__button:hover {
      background-color: rgba(0, 0, 0, 0.05);
}
.menubar__button.is-active {
      background-color: rgba(0, 0, 0, 0.1);
}
ul[data-type="todo_list"] {
  padding-left: 0;
}
li[data-type="todo_item"] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
}
.todo-checkbox {
  border: 2px solid #000000;
  height: 0.9em;
  width: 0.9em;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  margin-right: 10px;
  margin-top: 0.3rem;
  -moz-user-select: none;
   -ms-user-select: none;
       user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  border-radius: 0.2em;
  background-color: transparent;
  -webkit-transition: 0.4s background;
  transition: 0.4s background;
}
.todo-content {
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
li[data-done="true"] {
  text-decoration: line-through;
}
li[data-done="true"] .todo-checkbox {
  background-color: #000000;
}
li[data-done="false"] {
  text-decoration: none;
}

</style>


