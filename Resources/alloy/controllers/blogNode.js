function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.win = Ti.UI.createWindow({
        title: "Blog",
        id: "win"
    });
    $.addTopLevelView($.__views.win);
    init ? $.__views.win.addEventListener("focus", init) : __defers["$.__views.win!focus!init"] = !0;
    $.__views.web = Ti.UI.createWebView({
        id: "web"
    });
    $.__views.win.add($.__views.web);
    $.__views.errorLabel = Ti.UI.createLabel({
        text: "Please check your internet connection.",
        id: "errorLabel",
        visible: "false"
    });
    $.__views.win.add($.__views.errorLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var Alloy = require("alloy"), win = $.win, view = $.web;
    exports.window = win;
    var args = arguments[0] || {}, nid = args.nid || "", title = args.title || "";
    win.title = title;
    var init = function() {
        var url = Alloy.Globals.REST_PATH + "node/" + nid + ".json", xhr = Titanium.Network.createHTTPClient();
        xhr.open("GET", url);
        xhr.onerror = function() {
            handleError();
        };
        xhr.onload = function() {
            var statusCode = xhr.status;
            if (statusCode == 200) {
                var response = xhr.responseText, data = JSON.parse(response), bodyHtml = "<html><head><title>Sample HTML</title><link rel=\"stylesheet\" href=\"/includes/styles.css\" type=\"text/css\" /></head><body><div class=\"webview\">";
                bodyHtml = bodyHtml + "<h1>" + data.title + "</h1>" + data.body.und[0].value;
                bodyHtml += "</div></body></html>";
                view.setHtml(bodyHtml);
            } else handleError();
        };
        xhr.send();
    }, handleError = function() {
        $.errorLabel.visible;
    };
    __defers["$.__views.win!focus!init"] && $.__views.win.addEventListener("focus", init);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;