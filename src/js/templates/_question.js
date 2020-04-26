//Main Title Screen that appears when the page loads for the first time
export let content = `
<div class="grid grid-pad padding-left-0">
    <div class="col-1-1 padding-right-0">
      <h3 class="caps blue-light inline-block">New Record</h3>
    </div>

    <div class="col-1-1 padding-right-0">
      <div class="alert-ok hidden margin-bottom-20 fade-in" id="save-confirm">
        <div class="content" id="content">
          The parcel details have been saved...
        </div>
      </div>
    </div>
    
    <div class="col-1-1" id="parcel-edit" parcel-id="{{parcelId}}">
      <section id="parcel-patch">
        <div class="col-1-2">
          <label for="recordName">Name</label>
          <input type="text" placeholder="Record name..." value="" id="recordName" class="width-100">
          <label for="recordReferentie" class="margin-top-20">Referentie</label>
          <input type="text" placeholder="Referentie..." value="" id="recordReferentie" class="width-100">
          <label for="arrivalDate" class="margin-top-20">Arrival Date</label>
          <input type="text" placeholder="Date Parcel Arrived..." value="{{arrivalDate}}" id="arrivalDate" class="width-100"> 
        </div>

        <div class="col-1-2">
          <label for="remarks">Remarks</label>
          <input type="text" placeholder="Remarks..." value="{{remarks}}" id="remarks" class="width-100">
          <label class="margin-top-20">Extras</label>
          <input type="checkbox" id="nonEU" value="{{nonEU}}" class="input-switch-xs"> Non EU ? 
          <input type="checkbox" id="cooled" value="{{cooled}}" class="input-switch-xs"> Cooled ?
          <input type="checkbox" id="uN1845" value="{{uN1845}}" class="input-switch-xs"> UN1845 ?
          <input type="checkbox" id="uN3373" value="{{uN3373}}" class="input-switch-xs"> UN3373 ?
        </div>
      </section>
    </div>
    <div class="col-1-1">
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