//Main Title Screen that appears when the page loads for the first time
export let content = `
<div class="grid grid-pad padding-left-0">
    <div class="col-1-1 padding-right-0">
      <h3 class="caps blue-light inline-block">New Question</h3>
    </div>

    <div class="col-1-1 padding-right-0">
      <div class="alert-ok hidden margin-bottom-20 fade-in" id="save-confirm">
        <div class="content" id="content">
          The question details have been saved...
        </div>
      </div>
    </div>
    
    <div class="col-1-1" id="question-edit" question-id="{{id}}">
      <section id="parcel-patch">
        <div class="col-1-2">
          <label for="Title">Name</label>
          <input type="text" placeholder="Question..." value="{{title}}" id="title" class="width-100">
          <label for="subText" class="margin-top-20">Description</label>
          <input type="text" placeholder="Description..." value="{{subtext}}" id="subText" class="width-100">
          <label for="typeQuestion" class="margin-top-20">Type of Question</label>
          <input type="text" placeholder="Type of question" value="{{typequestion}}" id="typeQuestion" class="width-100"> 
          <label for="typeMedia" class="margin-top-20">Type of Media</label>
          <input type="text" placeholder="Type of media" value="{{typemedia}}" id="typeMedia" class="width-100"> 
          <label for="urlMedia" class="margin-top-20">URL of Media</label>
          <input type="text" placeholder="Url of media" value="{{urlmedia}}" id="urlMedia" class="width-100"> 
          </div>

        <div class="col-1-2">
          <label for="correctAnswer">Correct Answer</label>
          <input type="text" placeholder="Correct Answer..." value="{{correctanswer}}" id="correctAnswer" class="width-100">
          <label for="fakeAnswer1" class="margin-top-20">Fake Answer</label>
          <input type="text" placeholder="Fake Answer..." value="{{fakeanswer1}}" id="fakeAnswer1" class="width-100">
          <label for="fakeAnswer2" class="margin-top-20">Fake Answer</label>
          <input type="text" placeholder="Fake Answer..." value="{{fakeanswer2}}" id="fakeAnswer2" class="width-100">
          <label for="fakeAnswer3" class="margin-top-20">Fake Answer</label>
          <input type="text" placeholder="Fake Answer..." value="{{fakeanswer3}}" id="fakeAnswer3" class="width-100">
          <label for="fakeAnswer4" class="margin-top-20">Fake Answer</label>
          <input type="text" placeholder="Fake Answer..." value="{{fakeanswer4}}" id="fakeAnswer4" class="width-100">
          <label for="fakeAnswer5" class="margin-top-20">Fake Answer</label>
          <input type="text" placeholder="Fake Answer..." value="{{fakeanswer5}}" id="fakeAnswer5" class="width-100">
        </div>
      </section>
    </div>
    <div class="col-1-1">
    <div class="col-1-1 margin-top-30 text-right">
      <button type="button" class="btn-primary-xl inline" id="saveQuestion">SAVE</button>
    </div>
    <label class="margin-top-50">Add Image</label>
    <div class="upload-container margin-bottom-30" id="image-upload">
      <!-- render single image upload -->
    </div>

    <div class="photo-container margin-bottom-30" id="image-preview">  
      <div id="image-container" class="photo">

      </div>
    </div>
  </div>
</div>

`;