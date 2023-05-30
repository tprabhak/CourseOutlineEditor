export default function CommentCard({ comment }){
    return (
        <div>
            {comment.username}, {comment.selectedText}, {comment.commentText}
        </div>
    )
}
