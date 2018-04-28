/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "fbda4ca169106b299ba1"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) me.children.push(request);
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle")
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {any} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./client/index.js")(__webpack_require__.s = "./client/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/app.js":
/*!***********************!*\
  !*** ./client/app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril-stream */ \"./node_modules/mithril-stream/stream.js\");\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril_stream__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/helper/lib.js */ \"./shared/helper/lib.js\");\n\n\nconst APP = {\n    site_name: mithril_stream__WEBPACK_IMPORTED_MODULE_0___default()('Latona'),\n    logo: {src: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"assetLink\"])('/img/logo/logo.png')},\n    ads: [{src: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"assetLink\"])('/img/banner/ads1.jpg')}],\n    title: mithril_stream__WEBPACK_IMPORTED_MODULE_0___default()('LaToNa - Cắt tóc nhanh'),\n    links: {\n        home: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"link\"])('Trang chủ - Latona', '/'),\n        lend: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"link\"])('Thuê thợ', '/lend'),\n        book: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"link\"])('Đặt chỗ', '/book'),\n        discount: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"link\"])('Giảm giá mạnh', '/discount'),\n        login: Object(_shared_helper_lib_js__WEBPACK_IMPORTED_MODULE_1__[\"link\"])('Đăng nhập', '/login'),\n    },\n    header: {},\n    state: {\n        current: {\n            route: '/',\n        },\n    },\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (APP);\n\n\n//# sourceURL=webpack:///./client/app.js?");

/***/ }),

/***/ "./client/config.js":
/*!**************************!*\
  !*** ./client/config.js ***!
  \**************************/
/*! exports provided: DEFAULT_ROUTE, ASSET_DIR */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DEFAULT_ROUTE\", function() { return DEFAULT_ROUTE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ASSET_DIR\", function() { return ASSET_DIR; });\nconst DEFAULT_ROUTE = '/';\nconst ASSET_DIR = '/asset';\n\n\n//# sourceURL=webpack:///./client/config.js?");

/***/ }),

/***/ "./client/entity/member/Login.js":
/*!***************************************!*\
  !*** ./client/entity/member/Login.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/mithril.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril-stream */ \"./node_modules/mithril-stream/stream.js\");\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mithril_stream__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Login = {\n    oninit: v => {\n        v.state.text = mithril_stream__WEBPACK_IMPORTED_MODULE_1___default()('Login');\n    },\n    view: v =>\n        mithril__WEBPACK_IMPORTED_MODULE_0___default()(\n            'div.container',\n            mithril__WEBPACK_IMPORTED_MODULE_0___default()(\n                '.columns',\n                mithril__WEBPACK_IMPORTED_MODULE_0___default()(\n                    '.column.col-8.col-mx-auto',\n                    mithril__WEBPACK_IMPORTED_MODULE_0___default()('h3', v.state.text),\n                    mithril__WEBPACK_IMPORTED_MODULE_0___default()(\n                        '.form-group',\n                        mithril__WEBPACK_IMPORTED_MODULE_0___default()('label.form-label', 'Tài khoản'),\n                        mithril__WEBPACK_IMPORTED_MODULE_0___default()('input.form-input', {placeholder: 'Tài khoản của bạn '}),\n                    ),\n                ),\n            ),\n        ),\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Login);\n\n\n//# sourceURL=webpack:///./client/entity/member/Login.js?");

/***/ }),

/***/ "./client/entity/page/Home.js":
/*!************************************!*\
  !*** ./client/entity/page/Home.js ***!
  \************************************/
/*! exports provided: Home, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Home\", function() { return Home; });\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/mithril.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst Home = {\n    view: v => mithril__WEBPACK_IMPORTED_MODULE_0___default()('h1', 'hello'),\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n\n//# sourceURL=webpack:///./client/entity/page/Home.js?");

/***/ }),

/***/ "./client/index.js":
/*!*************************!*\
  !*** ./client/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/mithril.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ \"./client/route.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config.js */ \"./client/config.js\");\n\n\n\nlet root = document.body;\nmithril__WEBPACK_IMPORTED_MODULE_0___default.a.route(root, _config_js__WEBPACK_IMPORTED_MODULE_2__[\"DEFAULT_ROUTE\"], _route_js__WEBPACK_IMPORTED_MODULE_1__[\"routes\"]);\n\nconsole.log('hello');\n\n\n//# sourceURL=webpack:///./client/index.js?");

/***/ }),

/***/ "./client/layout/LayoutOneColumn.js":
/*!******************************************!*\
  !*** ./client/layout/LayoutOneColumn.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var is_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is_js */ \"./node_modules/is_js/is.js\");\n/* harmony import */ var is_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/mithril.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! mithril-stream */ \"./node_modules/mithril-stream/stream.js\");\n/* harmony import */ var mithril_stream__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(mithril_stream__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.js */ \"./client/app.js\");\n\n\n\n\nconst TopBar = {\n    oninit: v => {\n        v.state.links = [_app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].links.home, _app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].links.book, _app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].links.discount, _app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].links.lend];\n    },\n    view: v =>\n        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n            '.columns.header',\n            mithril__WEBPACK_IMPORTED_MODULE_1___default()('header.navbar.column.col-10.col-mx-auto', [\n                mithril__WEBPACK_IMPORTED_MODULE_1___default()('section.navbar-section.', [\n                    v.state.links.map(item =>\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                            'a.px-2',\n                            {\n                                key: item.href,\n                                href: item.href,\n                                class: item.href === mithril__WEBPACK_IMPORTED_MODULE_1___default.a.route.get() ? 'text-bold bg-white' : 'text-secondary',\n                                oncreate: mithril__WEBPACK_IMPORTED_MODULE_1___default.a.route.link,\n                            },\n                            item.text,\n                        ),\n                    ),\n                ]),\n            ]),\n        ),\n};\nconst Header = {\n    view: () =>\n        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n            '.columns.header.bg-white',\n            mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                'header.navbar.column.col-10.col-md-12.col-mx-auto.py-2',\n                mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                    '.column.navbar-section.hide-md',\n                    mithril__WEBPACK_IMPORTED_MODULE_1___default()('img.nav-logo', {src: _app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].logo.src}),\n                    mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                        '.btn-group',\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                            '.dropdown.d-inline-block.mx-2',\n                            mithril__WEBPACK_IMPORTED_MODULE_1___default()('.btn-group', [\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()(\"a.btn-wide.btn[href='#']\", 'Hà nội'),\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()(\"a.btn.dropdown-toggle[href='#'][tabindex='0']\", mithril__WEBPACK_IMPORTED_MODULE_1___default()('i.icon.icon-caret')),\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()('ul.menu', '...'),\n                            ]),\n                        ),\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                            '.dropdown.d-inline-block.mx-2',\n                            mithril__WEBPACK_IMPORTED_MODULE_1___default()('.btn-group', [\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()('a.btn-wide.btn[]', 'Làm đầu'),\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()('a.btn.dropdown-toggle[tabindex=0]', mithril__WEBPACK_IMPORTED_MODULE_1___default()('i.icon.icon-caret')),\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()('ul.menu', '...'),\n                            ]),\n                        ),\n                    ),\n                ),\n                mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                    '.column.navbar-center',\n                    mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                        '.input-group',\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                            '.form-group',\n                            mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                                '.has-icon-left',\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()('input.form-input.header-search', {placeholder: 'Thợ làm đầu, salon, mỹ phẩm...'}),\n                                mithril__WEBPACK_IMPORTED_MODULE_1___default()('.form-icon fa fa-shower'),\n                            ),\n                        ),\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()('button.btn', mithril__WEBPACK_IMPORTED_MODULE_1___default()('i.fas.fa-search'), 'Tìm kiếm '),\n                    ),\n                ),\n                mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                    '.column.navbar-section',\n                    mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                        '.btn-group',\n\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()('a.btn.form-group', mithril__WEBPACK_IMPORTED_MODULE_1___default()('i.fas.fa-bell')),\n                        mithril__WEBPACK_IMPORTED_MODULE_1___default()(\n                            'a.btn.btn-wite',\n                            {href: _app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].links.login.href, oncreate: mithril__WEBPACK_IMPORTED_MODULE_1___default.a.route.link},\n                            _app_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].links.login.text,\n                        ),\n                    ),\n                ),\n            ),\n        ),\n};\nconst LayoutOneColumn = {\n    oninit: v => {\n        v.state.text = mithril_stream__WEBPACK_IMPORTED_MODULE_2___default()('');\n    },\n    view: v => mithril__WEBPACK_IMPORTED_MODULE_1___default()('.container', [mithril__WEBPACK_IMPORTED_MODULE_1___default()(TopBar), mithril__WEBPACK_IMPORTED_MODULE_1___default()(Header), mithril__WEBPACK_IMPORTED_MODULE_1___default()('div', v.state.text, v.children)]),\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (LayoutOneColumn);\n\n\n//# sourceURL=webpack:///./client/layout/LayoutOneColumn.js?");

/***/ }),

/***/ "./client/route.js":
/*!*************************!*\
  !*** ./client/route.js ***!
  \*************************/
/*! exports provided: routes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"routes\", function() { return routes; });\n/* harmony import */ var _entity_page_Home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity/page/Home.js */ \"./client/entity/page/Home.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mithril */ \"./node_modules/mithril/mithril.js\");\n/* harmony import */ var mithril__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mithril__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _layout_LayoutOneColumn_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout/LayoutOneColumn.js */ \"./client/layout/LayoutOneColumn.js\");\n/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config.js */ \"./client/config.js\");\n/* harmony import */ var _entity_member_Login_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./entity/member/Login.js */ \"./client/entity/member/Login.js\");\n\n\n\n\n\nlet defaultLayout = (component, attr = {}) => ({view: () => mithril__WEBPACK_IMPORTED_MODULE_1___default()(_layout_LayoutOneColumn_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {attr}, mithril__WEBPACK_IMPORTED_MODULE_1___default()(component))});\n\nconst routes = {\n    '/': defaultLayout(_entity_page_Home_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n    [_config_js__WEBPACK_IMPORTED_MODULE_3__[\"DEFAULT_ROUTE\"]]: defaultLayout(_entity_page_Home_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n\n    '/login': defaultLayout(_entity_member_Login_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n};\n\n\n//# sourceURL=webpack:///./client/route.js?");

/***/ }),

/***/ "./node_modules/is_js/is.js":
/*!**********************************!*\
  !*** ./node_modules/is_js/is.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * is.js 0.8.0\n * Author: Aras Atasaygin\n */\n\n// AMD with global, Node, or global\n;(function(root, factory) {    // eslint-disable-line no-extra-semi\n    if (true) {\n        // AMD. Register as an anonymous module.\n        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {\n            // Also create a global in case some scripts\n            // that are loaded still are looking for\n            // a global even when an AMD loader is in use.\n            return (root.is = factory());\n        }).call(exports, __webpack_require__, exports, module),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n    } else {}\n}(this, function() {\n\n    // Baseline\n    /* -------------------------------------------------------------------------- */\n\n    // define 'is' object and current version\n    var is = {};\n    is.VERSION = '0.8.0';\n\n    // define interfaces\n    is.not = {};\n    is.all = {};\n    is.any = {};\n\n    // cache some methods to call later on\n    var toString = Object.prototype.toString;\n    var slice = Array.prototype.slice;\n    var hasOwnProperty = Object.prototype.hasOwnProperty;\n\n    // helper function which reverses the sense of predicate result\n    function not(func) {\n        return function() {\n            return !func.apply(null, slice.call(arguments));\n        };\n    }\n\n    // helper function which call predicate function per parameter and return true if all pass\n    function all(func) {\n        return function() {\n            var params = getParams(arguments);\n            var length = params.length;\n            for (var i = 0; i < length; i++) {\n                if (!func.call(null, params[i])) {\n                    return false;\n                }\n            }\n            return true;\n        };\n    }\n\n    // helper function which call predicate function per parameter and return true if any pass\n    function any(func) {\n        return function() {\n            var params = getParams(arguments);\n            var length = params.length;\n            for (var i = 0; i < length; i++) {\n                if (func.call(null, params[i])) {\n                    return true;\n                }\n            }\n            return false;\n        };\n    }\n\n    // build a 'comparator' object for various comparison checks\n    var comparator = {\n        '<': function(a, b) { return a < b; },\n        '<=': function(a, b) { return a <= b; },\n        '>': function(a, b) { return a > b; },\n        '>=': function(a, b) { return a >= b; }\n    }\n\n    // helper function which compares a version to a range\n    function compareVersion(version, range) {\n        var string = (range + '');\n        var n = +(string.match(/\\d+/) || NaN);\n        var op = string.match(/^[<>]=?|/)[0];\n        return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);\n    }\n\n    // helper function which extracts params from arguments\n    function getParams(args) {\n        var params = slice.call(args);\n        var length = params.length;\n        if (length === 1 && is.array(params[0])) {    // support array\n            params = params[0];\n        }\n        return params;\n    }\n\n    // Type checks\n    /* -------------------------------------------------------------------------- */\n\n    // is a given value Arguments?\n    is.arguments = function(value) {    // fallback check is for IE\n        return toString.call(value) === '[object Arguments]' ||\n            (value != null && typeof value === 'object' && 'callee' in value);\n    };\n\n    // is a given value Array?\n    is.array = Array.isArray || function(value) {    // check native isArray first\n        return toString.call(value) === '[object Array]';\n    };\n\n    // is a given value Boolean?\n    is.boolean = function(value) {\n        return value === true || value === false || toString.call(value) === '[object Boolean]';\n    };\n\n    // is a given value Char?\n    is.char = function(value) {\n        return is.string(value) && value.length === 1;\n    };\n\n    // is a given value Date Object?\n    is.date = function(value) {\n        return toString.call(value) === '[object Date]';\n    };\n\n    // is a given object a DOM node?\n    is.domNode = function(object) {\n        return is.object(object) && object.nodeType > 0;\n    };\n\n    // is a given value Error object?\n    is.error = function(value) {\n        return toString.call(value) === '[object Error]';\n    };\n\n    // is a given value function?\n    is['function'] = function(value) {    // fallback check is for IE\n        return toString.call(value) === '[object Function]' || typeof value === 'function';\n    };\n\n    // is given value a pure JSON object?\n    is.json = function(value) {\n        return toString.call(value) === '[object Object]';\n    };\n\n    // is a given value NaN?\n    is.nan = function(value) {    // NaN is number :) Also it is the only value which does not equal itself\n        return value !== value;\n    };\n\n    // is a given value null?\n    is['null'] = function(value) {\n        return value === null;\n    };\n\n    // is a given value number?\n    is.number = function(value) {\n        return is.not.nan(value) && toString.call(value) === '[object Number]';\n    };\n\n    // is a given value object?\n    is.object = function(value) {\n        return Object(value) === value;\n    };\n\n    // is a given value RegExp?\n    is.regexp = function(value) {\n        return toString.call(value) === '[object RegExp]';\n    };\n\n    // are given values same type?\n    // prevent NaN, Number same type check\n    is.sameType = function(value, other) {\n        var tag = toString.call(value);\n        if (tag !== toString.call(other)) {\n            return false;\n        }\n        if (tag === '[object Number]') {\n            return !is.any.nan(value, other) || is.all.nan(value, other);\n        }\n        return true;\n    };\n    // sameType method does not support 'all' and 'any' interfaces\n    is.sameType.api = ['not'];\n\n    // is a given value String?\n    is.string = function(value) {\n        return toString.call(value) === '[object String]';\n    };\n\n    // is a given value undefined?\n    is.undefined = function(value) {\n        return value === void 0;\n    };\n\n    // is a given value window?\n    // setInterval method is only available for window object\n    is.windowObject = function(value) {\n        return value != null && typeof value === 'object' && 'setInterval' in value;\n    };\n\n    // Presence checks\n    /* -------------------------------------------------------------------------- */\n\n    //is a given value empty? Objects, arrays, strings\n    is.empty = function(value) {\n        if (is.object(value)) {\n            var length = Object.getOwnPropertyNames(value).length;\n            if (length === 0 || (length === 1 && is.array(value)) ||\n                    (length === 2 && is.arguments(value))) {\n                return true;\n            }\n            return false;\n        }\n        return value === '';\n    };\n\n    // is a given value existy?\n    is.existy = function(value) {\n        return value != null;\n    };\n\n    // is a given value falsy?\n    is.falsy = function(value) {\n        return !value;\n    };\n\n    // is a given value truthy?\n    is.truthy = not(is.falsy);\n\n    // Arithmetic checks\n    /* -------------------------------------------------------------------------- */\n\n    // is a given number above minimum parameter?\n    is.above = function(n, min) {\n        return is.all.number(n, min) && n > min;\n    };\n    // above method does not support 'all' and 'any' interfaces\n    is.above.api = ['not'];\n\n    // is a given number decimal?\n    is.decimal = function(n) {\n        return is.number(n) && n % 1 !== 0;\n    };\n\n    // are given values equal? supports numbers, strings, regexes, booleans\n    // TODO: Add object and array support\n    is.equal = function(value, other) {\n        // check 0 and -0 equity with Infinity and -Infinity\n        if (is.all.number(value, other)) {\n            return value === other && 1 / value === 1 / other;\n        }\n        // check regexes as strings too\n        if (is.all.string(value, other) || is.all.regexp(value, other)) {\n            return '' + value === '' + other;\n        }\n        if (is.all.boolean(value, other)) {\n            return value === other;\n        }\n        return false;\n    };\n    // equal method does not support 'all' and 'any' interfaces\n    is.equal.api = ['not'];\n\n    // is a given number even?\n    is.even = function(n) {\n        return is.number(n) && n % 2 === 0;\n    };\n\n    // is a given number finite?\n    is.finite = isFinite || function(n) {\n        return is.not.infinite(n) && is.not.nan(n);\n    };\n\n    // is a given number infinite?\n    is.infinite = function(n) {\n        return n === Infinity || n === -Infinity;\n    };\n\n    // is a given number integer?\n    is.integer = function(n) {\n        return is.number(n) && n % 1 === 0;\n    };\n\n    // is a given number negative?\n    is.negative = function(n) {\n        return is.number(n) && n < 0;\n    };\n\n    // is a given number odd?\n    is.odd = function(n) {\n        return is.number(n) && n % 2 === 1;\n    };\n\n    // is a given number positive?\n    is.positive = function(n) {\n        return is.number(n) && n > 0;\n    };\n\n    // is a given number above maximum parameter?\n    is.under = function(n, max) {\n        return is.all.number(n, max) && n < max;\n    };\n    // least method does not support 'all' and 'any' interfaces\n    is.under.api = ['not'];\n\n    // is a given number within minimum and maximum parameters?\n    is.within = function(n, min, max) {\n        return is.all.number(n, min, max) && n > min && n < max;\n    };\n    // within method does not support 'all' and 'any' interfaces\n    is.within.api = ['not'];\n\n    // Regexp checks\n    /* -------------------------------------------------------------------------- */\n    // Steven Levithan, Jan Goyvaerts: Regular Expressions Cookbook\n    // Scott Gonzalez: Email address validation\n\n    // dateString match m/d/yy and mm/dd/yyyy, allowing any combination of one or two digits for the day and month, and two or four digits for the year\n    // eppPhone match extensible provisioning protocol format\n    // nanpPhone match north american number plan format\n    // time match hours, minutes, and seconds, 24-hour clock\n    var regexes = {\n        affirmative: /^(?:1|t(?:rue)?|y(?:es)?|ok(?:ay)?)$/,\n        alphaNumeric: /^[A-Za-z0-9]+$/,\n        caPostalCode: /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]\\s?[0-9][A-Z][0-9]$/,\n        creditCard: /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,\n        dateString: /^(1[0-2]|0?[1-9])([\\/-])(3[01]|[12][0-9]|0?[1-9])(?:\\2)(?:[0-9]{2})?[0-9]{2}$/,\n        email: /^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))$/i, // eslint-disable-line no-control-regex\n        eppPhone: /^\\+[0-9]{1,3}\\.[0-9]{4,14}(?:x.+)?$/,\n        hexadecimal: /^(?:0x)?[0-9a-fA-F]+$/,\n        hexColor: /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,\n        ipv4: /^(?:(?:\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])$/,\n        ipv6: /^((?=.*::)(?!.*::.+::)(::)?([\\dA-F]{1,4}:(:|\\b)|){5}|([\\dA-F]{1,4}:){6})((([\\dA-F]{1,4}((?!\\3)::|:\\b|$))|(?!\\2\\3)){2}|(((2[0-4]|1\\d|[1-9])?\\d|25[0-5])\\.?\\b){4})$/i,\n        nanpPhone: /^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,\n        socialSecurityNumber: /^(?!000|666)[0-8][0-9]{2}-?(?!00)[0-9]{2}-?(?!0000)[0-9]{4}$/,\n        timeString: /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])$/,\n        ukPostCode: /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/,\n        url: /^(?:(?:https?|ftp):\\/\\/)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:\\/\\S*)?$/i,\n        usZipCode: /^[0-9]{5}(?:-[0-9]{4})?$/\n    };\n\n    function regexpCheck(regexp, regexes) {\n        is[regexp] = function(value) {\n            return regexes[regexp].test(value);\n        };\n    }\n\n    // create regexp checks methods from 'regexes' object\n    for (var regexp in regexes) {\n        if (regexes.hasOwnProperty(regexp)) {\n            regexpCheck(regexp, regexes);\n        }\n    }\n\n    // simplify IP checks by calling the regex helpers for IPv4 and IPv6\n    is.ip = function(value) {\n        return is.ipv4(value) || is.ipv6(value);\n    };\n\n    // String checks\n    /* -------------------------------------------------------------------------- */\n\n    // is a given string or sentence capitalized?\n    is.capitalized = function(string) {\n        if (is.not.string(string)) {\n            return false;\n        }\n        var words = string.split(' ');\n        for (var i = 0; i < words.length; i++) {\n            var word = words[i];\n            if (word.length) {\n                var chr = word.charAt(0);\n                if (chr !== chr.toUpperCase()) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    };\n\n    // is string end with a given target parameter?\n    is.endWith = function(string, target) {\n        if (is.not.string(string)) {\n            return false;\n        }\n        target += '';\n        var position = string.length - target.length;\n        return position >= 0 && string.indexOf(target, position) === position;\n    };\n    // endWith method does not support 'all' and 'any' interfaces\n    is.endWith.api = ['not'];\n\n    // is a given string include parameter target?\n    is.include = function(string, target) {\n        return string.indexOf(target) > -1;\n    };\n    // include method does not support 'all' and 'any' interfaces\n    is.include.api = ['not'];\n\n    // is a given string all lowercase?\n    is.lowerCase = function(string) {\n        return is.string(string) && string === string.toLowerCase();\n    };\n\n    // is a given string palindrome?\n    is.palindrome = function(string) {\n        if (is.not.string(string)) {\n            return false;\n        }\n        string = string.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase();\n        var length = string.length - 1;\n        for (var i = 0, half = Math.floor(length / 2); i <= half; i++) {\n            if (string.charAt(i) !== string.charAt(length - i)) {\n                return false;\n            }\n        }\n        return true;\n    };\n\n    // is a given value space?\n    // horizantal tab: 9, line feed: 10, vertical tab: 11, form feed: 12, carriage return: 13, space: 32\n    is.space = function(value) {\n        if (is.not.char(value)) {\n            return false;\n        }\n        var charCode = value.charCodeAt(0);\n        return (charCode > 8 && charCode < 14) || charCode === 32;\n    };\n\n    // is string start with a given target parameter?\n    is.startWith = function(string, target) {\n        return is.string(string) && string.indexOf(target) === 0;\n    };\n    // startWith method does not support 'all' and 'any' interfaces\n    is.startWith.api = ['not'];\n\n    // is a given string all uppercase?\n    is.upperCase = function(string) {\n        return is.string(string) && string === string.toUpperCase();\n    };\n\n    // Time checks\n    /* -------------------------------------------------------------------------- */\n\n    var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];\n    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];\n\n    // is a given dates day equal given day parameter?\n    is.day = function(date, day) {\n        return is.date(date) && day.toLowerCase() === days[date.getDay()];\n    };\n    // day method does not support 'all' and 'any' interfaces\n    is.day.api = ['not'];\n\n    // is a given date in daylight saving time?\n    is.dayLightSavingTime = function(date) {\n        var january = new Date(date.getFullYear(), 0, 1);\n        var july = new Date(date.getFullYear(), 6, 1);\n        var stdTimezoneOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());\n        return date.getTimezoneOffset() < stdTimezoneOffset;\n    };\n\n    // is a given date future?\n    is.future = function(date) {\n        var now = new Date();\n        return is.date(date) && date.getTime() > now.getTime();\n    };\n\n    // is date within given range?\n    is.inDateRange = function(date, start, end) {\n        if (is.not.date(date) || is.not.date(start) || is.not.date(end)) {\n            return false;\n        }\n        var stamp = date.getTime();\n        return stamp > start.getTime() && stamp < end.getTime();\n    };\n    // inDateRange method does not support 'all' and 'any' interfaces\n    is.inDateRange.api = ['not'];\n\n    // is a given date in last month range?\n    is.inLastMonth = function(date) {\n        return is.inDateRange(date, new Date(new Date().setMonth(new Date().getMonth() - 1)), new Date());\n    };\n\n    // is a given date in last week range?\n    is.inLastWeek = function(date) {\n        return is.inDateRange(date, new Date(new Date().setDate(new Date().getDate() - 7)), new Date());\n    };\n\n    // is a given date in last year range?\n    is.inLastYear = function(date) {\n        return is.inDateRange(date, new Date(new Date().setFullYear(new Date().getFullYear() - 1)), new Date());\n    };\n\n    // is a given date in next month range?\n    is.inNextMonth = function(date) {\n        return is.inDateRange(date, new Date(), new Date(new Date().setMonth(new Date().getMonth() + 1)));\n    };\n\n    // is a given date in next week range?\n    is.inNextWeek = function(date) {\n        return is.inDateRange(date, new Date(), new Date(new Date().setDate(new Date().getDate() + 7)));\n    };\n\n    // is a given date in next year range?\n    is.inNextYear = function(date) {\n        return is.inDateRange(date, new Date(), new Date(new Date().setFullYear(new Date().getFullYear() + 1)));\n    };\n\n    // is the given year a leap year?\n    is.leapYear = function(year) {\n        return is.number(year) && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0);\n    };\n\n    // is a given dates month equal given month parameter?\n    is.month = function(date, month) {\n        return is.date(date) && month.toLowerCase() === months[date.getMonth()];\n    };\n    // month method does not support 'all' and 'any' interfaces\n    is.month.api = ['not'];\n\n    // is a given date past?\n    is.past = function(date) {\n        var now = new Date();\n        return is.date(date) && date.getTime() < now.getTime();\n    };\n\n    // is a given date in the parameter quarter?\n    is.quarterOfYear = function(date, quarter) {\n        return is.date(date) && is.number(quarter) && quarter === Math.floor((date.getMonth() + 3) / 3);\n    };\n    // quarterOfYear method does not support 'all' and 'any' interfaces\n    is.quarterOfYear.api = ['not'];\n\n    // is a given date indicate today?\n    is.today = function(date) {\n        var now = new Date();\n        var todayString = now.toDateString();\n        return is.date(date) && date.toDateString() === todayString;\n    };\n\n    // is a given date indicate tomorrow?\n    is.tomorrow = function(date) {\n        var now = new Date();\n        var tomorrowString = new Date(now.setDate(now.getDate() + 1)).toDateString();\n        return is.date(date) && date.toDateString() === tomorrowString;\n    };\n\n    // is a given date weekend?\n    // 6: Saturday, 0: Sunday\n    is.weekend = function(date) {\n        return is.date(date) && (date.getDay() === 6 || date.getDay() === 0);\n    };\n\n    // is a given date weekday?\n    is.weekday = not(is.weekend);\n\n    // is a given dates year equal given year parameter?\n    is.year = function(date, year) {\n        return is.date(date) && is.number(year) && year === date.getFullYear();\n    };\n    // year method does not support 'all' and 'any' interfaces\n    is.year.api = ['not'];\n\n    // is a given date indicate yesterday?\n    is.yesterday = function(date) {\n        var now = new Date();\n        var yesterdayString = new Date(now.setDate(now.getDate() - 1)).toDateString();\n        return is.date(date) && date.toDateString() === yesterdayString;\n    };\n\n    // Environment checks\n    /* -------------------------------------------------------------------------- */\n\n    var freeGlobal = is.windowObject(typeof global == 'object' && global) && global;\n    var freeSelf = is.windowObject(typeof self == 'object' && self) && self;\n    var thisGlobal = is.windowObject(typeof this == 'object' && this) && this;\n    var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();\n\n    var document = freeSelf && freeSelf.document;\n    var previousIs = root.is;\n\n    // store navigator properties to use later\n    var navigator = freeSelf && freeSelf.navigator;\n    var appVersion = (navigator && navigator.appVersion || '').toLowerCase();\n    var userAgent = (navigator && navigator.userAgent || '').toLowerCase();\n    var vendor = (navigator && navigator.vendor || '').toLowerCase();\n\n    // is current device android?\n    is.android = function() {\n        return /android/.test(userAgent);\n    };\n    // android method does not support 'all' and 'any' interfaces\n    is.android.api = ['not'];\n\n    // is current device android phone?\n    is.androidPhone = function() {\n        return /android/.test(userAgent) && /mobile/.test(userAgent);\n    };\n    // androidPhone method does not support 'all' and 'any' interfaces\n    is.androidPhone.api = ['not'];\n\n    // is current device android tablet?\n    is.androidTablet = function() {\n        return /android/.test(userAgent) && !/mobile/.test(userAgent);\n    };\n    // androidTablet method does not support 'all' and 'any' interfaces\n    is.androidTablet.api = ['not'];\n\n    // is current device blackberry?\n    is.blackberry = function() {\n        return /blackberry/.test(userAgent) || /bb10/.test(userAgent);\n    };\n    // blackberry method does not support 'all' and 'any' interfaces\n    is.blackberry.api = ['not'];\n\n    // is current browser chrome?\n    // parameter is optional\n    is.chrome = function(range) {\n        var match = /google inc/.test(vendor) ? userAgent.match(/(?:chrome|crios)\\/(\\d+)/) : null;\n        return match !== null && compareVersion(match[1], range);\n    };\n    // chrome method does not support 'all' and 'any' interfaces\n    is.chrome.api = ['not'];\n\n    // is current device desktop?\n    is.desktop = function() {\n        return is.not.mobile() && is.not.tablet();\n    };\n    // desktop method does not support 'all' and 'any' interfaces\n    is.desktop.api = ['not'];\n\n    // is current browser edge?\n    // parameter is optional\n    is.edge = function(range) {\n        var match = userAgent.match(/edge\\/(\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // edge method does not support 'all' and 'any' interfaces\n    is.edge.api = ['not'];\n\n    // is current browser firefox?\n    // parameter is optional\n    is.firefox = function(range) {\n        var match = userAgent.match(/(?:firefox|fxios)\\/(\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // firefox method does not support 'all' and 'any' interfaces\n    is.firefox.api = ['not'];\n\n    // is current browser internet explorer?\n    // parameter is optional\n    is.ie = function(range) {\n        var match = userAgent.match(/(?:msie |trident.+?; rv:)(\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // ie method does not support 'all' and 'any' interfaces\n    is.ie.api = ['not'];\n\n    // is current device ios?\n    is.ios = function() {\n        return is.iphone() || is.ipad() || is.ipod();\n    };\n    // ios method does not support 'all' and 'any' interfaces\n    is.ios.api = ['not'];\n\n    // is current device ipad?\n    // parameter is optional\n    is.ipad = function(range) {\n        var match = userAgent.match(/ipad.+?os (\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // ipad method does not support 'all' and 'any' interfaces\n    is.ipad.api = ['not'];\n\n    // is current device iphone?\n    // parameter is optional\n    is.iphone = function(range) {\n        // original iPhone doesn't have the os portion of the UA\n        var match = userAgent.match(/iphone(?:.+?os (\\d+))?/);\n        return match !== null && compareVersion(match[1] || 1, range);\n    };\n    // iphone method does not support 'all' and 'any' interfaces\n    is.iphone.api = ['not'];\n\n    // is current device ipod?\n    // parameter is optional\n    is.ipod = function(range) {\n        var match = userAgent.match(/ipod.+?os (\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // ipod method does not support 'all' and 'any' interfaces\n    is.ipod.api = ['not'];\n\n    // is current operating system linux?\n    is.linux = function() {\n        return /linux/.test(appVersion);\n    };\n    // linux method does not support 'all' and 'any' interfaces\n    is.linux.api = ['not'];\n\n    // is current operating system mac?\n    is.mac = function() {\n        return /mac/.test(appVersion);\n    };\n    // mac method does not support 'all' and 'any' interfaces\n    is.mac.api = ['not'];\n\n    // is current device mobile?\n    is.mobile = function() {\n        return is.iphone() || is.ipod() || is.androidPhone() || is.blackberry() || is.windowsPhone();\n    };\n    // mobile method does not support 'all' and 'any' interfaces\n    is.mobile.api = ['not'];\n\n    // is current state offline?\n    is.offline = not(is.online);\n    // offline method does not support 'all' and 'any' interfaces\n    is.offline.api = ['not'];\n\n    // is current state online?\n    is.online = function() {\n        return !navigator || navigator.onLine === true;\n    };\n    // online method does not support 'all' and 'any' interfaces\n    is.online.api = ['not'];\n\n    // is current browser opera?\n    // parameter is optional\n    is.opera = function(range) {\n        var match = userAgent.match(/(?:^opera.+?version|opr)\\/(\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // opera method does not support 'all' and 'any' interfaces\n    is.opera.api = ['not'];\n\n    // is current browser phantomjs?\n    // parameter is optional\n    is.phantom = function(range) {\n        var match = userAgent.match(/phantomjs\\/(\\d+)/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // phantom method does not support 'all' and 'any' interfaces\n    is.phantom.api = ['not'];\n\n    // is current browser safari?\n    // parameter is optional\n    is.safari = function(range) {\n        var match = userAgent.match(/version\\/(\\d+).+?safari/);\n        return match !== null && compareVersion(match[1], range);\n    };\n    // safari method does not support 'all' and 'any' interfaces\n    is.safari.api = ['not'];\n\n    // is current device tablet?\n    is.tablet = function() {\n        return is.ipad() || is.androidTablet() || is.windowsTablet();\n    };\n    // tablet method does not support 'all' and 'any' interfaces\n    is.tablet.api = ['not'];\n\n    // is current device supports touch?\n    is.touchDevice = function() {\n        return !!document && ('ontouchstart' in freeSelf ||\n            ('DocumentTouch' in freeSelf && document instanceof DocumentTouch));\n    };\n    // touchDevice method does not support 'all' and 'any' interfaces\n    is.touchDevice.api = ['not'];\n\n    // is current operating system windows?\n    is.windows = function() {\n        return /win/.test(appVersion);\n    };\n    // windows method does not support 'all' and 'any' interfaces\n    is.windows.api = ['not'];\n\n    // is current device windows phone?\n    is.windowsPhone = function() {\n        return is.windows() && /phone/.test(userAgent);\n    };\n    // windowsPhone method does not support 'all' and 'any' interfaces\n    is.windowsPhone.api = ['not'];\n\n    // is current device windows tablet?\n    is.windowsTablet = function() {\n        return is.windows() && is.not.windowsPhone() && /touch/.test(userAgent);\n    };\n    // windowsTablet method does not support 'all' and 'any' interfaces\n    is.windowsTablet.api = ['not'];\n\n    // Object checks\n    /* -------------------------------------------------------------------------- */\n\n    // has a given object got parameterized count property?\n    is.propertyCount = function(object, count) {\n        if (is.not.object(object) || is.not.number(count)) {\n            return false;\n        }\n        var n = 0;\n        for (var property in object) {\n            if (hasOwnProperty.call(object, property) && ++n > count) {\n                return false;\n            }\n        }\n        return n === count;\n    };\n    // propertyCount method does not support 'all' and 'any' interfaces\n    is.propertyCount.api = ['not'];\n\n    // is given object has parameterized property?\n    is.propertyDefined = function(object, property) {\n        return is.object(object) && is.string(property) && property in object;\n    };\n    // propertyDefined method does not support 'all' and 'any' interfaces\n    is.propertyDefined.api = ['not'];\n\n    // Array checks\n    /* -------------------------------------------------------------------------- */\n\n    // is a given item in an array?\n    is.inArray = function(value, array) {\n        if (is.not.array(array)) {\n            return false;\n        }\n        for (var i = 0; i < array.length; i++) {\n            if (array[i] === value) {\n                return true;\n            }\n        }\n        return false;\n    };\n    // inArray method does not support 'all' and 'any' interfaces\n    is.inArray.api = ['not'];\n\n    // is a given array sorted?\n    is.sorted = function(array, sign) {\n        if (is.not.array(array)) {\n            return false;\n        }\n        var predicate = comparator[sign] || comparator['>='];\n        for (var i = 1; i < array.length; i++) {\n            if (!predicate(array[i], array[i - 1])) {\n                return false;\n            }\n        }\n        return true;\n    };\n\n    // API\n    // Set 'not', 'all' and 'any' interfaces to methods based on their api property\n    /* -------------------------------------------------------------------------- */\n\n    function setInterfaces() {\n        var options = is;\n        for (var option in options) {\n            if (hasOwnProperty.call(options, option) && is['function'](options[option])) {\n                var interfaces = options[option].api || ['not', 'all', 'any'];\n                for (var i = 0; i < interfaces.length; i++) {\n                    if (interfaces[i] === 'not') {\n                        is.not[option] = not(is[option]);\n                    }\n                    if (interfaces[i] === 'all') {\n                        is.all[option] = all(is[option]);\n                    }\n                    if (interfaces[i] === 'any') {\n                        is.any[option] = any(is[option]);\n                    }\n                }\n            }\n        }\n    }\n    setInterfaces();\n\n    // Configuration methods\n    // Intentionally added after setInterfaces function\n    /* -------------------------------------------------------------------------- */\n\n    // change namespace of library to prevent name collisions\n    // var preferredName = is.setNamespace();\n    // preferredName.odd(3);\n    // => true\n    is.setNamespace = function() {\n        root.is = previousIs;\n        return this;\n    };\n\n    // set optional regexes to methods\n    is.setRegexp = function(regexp, name) {\n        for (var r in regexes) {\n            if (hasOwnProperty.call(regexes, r) && (name === r)) {\n                regexes[r] = regexp;\n            }\n        }\n    };\n\n    return is;\n}));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/is_js/is.js?");

/***/ }),

/***/ "./node_modules/mithril-stream/stream.js":
/*!***********************************************!*\
  !*** ./node_modules/mithril-stream/stream.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* eslint-disable */\r\n;(function() {\r\n\"use strict\"\r\n/* eslint-enable */\r\n\r\nvar guid = 0, HALT = {}\r\nfunction createStream() {\r\n\tfunction stream() {\r\n\t\tif (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0])\r\n\t\treturn stream._state.value\r\n\t}\r\n\tinitStream(stream)\r\n\r\n\tif (arguments.length > 0 && arguments[0] !== HALT) updateStream(stream, arguments[0])\r\n\r\n\treturn stream\r\n}\r\nfunction initStream(stream) {\r\n\tstream.constructor = createStream\r\n\tstream._state = {id: guid++, value: undefined, state: 0, derive: undefined, recover: undefined, deps: {}, parents: [], endStream: undefined, unregister: undefined}\r\n\tstream.map = stream[\"fantasy-land/map\"] = map, stream[\"fantasy-land/ap\"] = ap, stream[\"fantasy-land/of\"] = createStream\r\n\tstream.valueOf = valueOf, stream.toJSON = toJSON, stream.toString = valueOf\r\n\r\n\tObject.defineProperties(stream, {\r\n\t\tend: {get: function() {\r\n\t\t\tif (!stream._state.endStream) {\r\n\t\t\t\tvar endStream = createStream()\r\n\t\t\t\tendStream.map(function(value) {\r\n\t\t\t\t\tif (value === true) {\r\n\t\t\t\t\t\tunregisterStream(stream)\r\n\t\t\t\t\t\tendStream._state.unregister = function(){unregisterStream(endStream)}\r\n\t\t\t\t\t}\r\n\t\t\t\t\treturn value\r\n\t\t\t\t})\r\n\t\t\t\tstream._state.endStream = endStream\r\n\t\t\t}\r\n\t\t\treturn stream._state.endStream\r\n\t\t}}\r\n\t})\r\n}\r\nfunction updateStream(stream, value) {\r\n\tupdateState(stream, value)\r\n\tfor (var id in stream._state.deps) updateDependency(stream._state.deps[id], false)\r\n\tif (stream._state.unregister != null) stream._state.unregister()\r\n\tfinalize(stream)\r\n}\r\nfunction updateState(stream, value) {\r\n\tstream._state.value = value\r\n\tstream._state.changed = true\r\n\tif (stream._state.state !== 2) stream._state.state = 1\r\n}\r\nfunction updateDependency(stream, mustSync) {\r\n\tvar state = stream._state, parents = state.parents\r\n\tif (parents.length > 0 && parents.every(active) && (mustSync || parents.some(changed))) {\r\n\t\tvar value = stream._state.derive()\r\n\t\tif (value === HALT) return false\r\n\t\tupdateState(stream, value)\r\n\t}\r\n}\r\nfunction finalize(stream) {\r\n\tstream._state.changed = false\r\n\tfor (var id in stream._state.deps) stream._state.deps[id]._state.changed = false\r\n}\r\n\r\nfunction combine(fn, streams) {\r\n\tif (!streams.every(valid)) throw new Error(\"Ensure that each item passed to stream.combine/stream.merge is a stream\")\r\n\treturn initDependency(createStream(), streams, function() {\r\n\t\treturn fn.apply(this, streams.concat([streams.filter(changed)]))\r\n\t})\r\n}\r\n\r\nfunction initDependency(dep, streams, derive) {\r\n\tvar state = dep._state\r\n\tstate.derive = derive\r\n\tstate.parents = streams.filter(notEnded)\r\n\r\n\tregisterDependency(dep, state.parents)\r\n\tupdateDependency(dep, true)\r\n\r\n\treturn dep\r\n}\r\nfunction registerDependency(stream, parents) {\r\n\tfor (var i = 0; i < parents.length; i++) {\r\n\t\tparents[i]._state.deps[stream._state.id] = stream\r\n\t\tregisterDependency(stream, parents[i]._state.parents)\r\n\t}\r\n}\r\nfunction unregisterStream(stream) {\r\n\tfor (var i = 0; i < stream._state.parents.length; i++) {\r\n\t\tvar parent = stream._state.parents[i]\r\n\t\tdelete parent._state.deps[stream._state.id]\r\n\t}\r\n\tfor (var id in stream._state.deps) {\r\n\t\tvar dependent = stream._state.deps[id]\r\n\t\tvar index = dependent._state.parents.indexOf(stream)\r\n\t\tif (index > -1) dependent._state.parents.splice(index, 1)\r\n\t}\r\n\tstream._state.state = 2 //ended\r\n\tstream._state.deps = {}\r\n}\r\n\r\nfunction map(fn) {return combine(function(stream) {return fn(stream())}, [this])}\r\nfunction ap(stream) {return combine(function(s1, s2) {return s1()(s2())}, [stream, this])}\r\nfunction valueOf() {return this._state.value}\r\nfunction toJSON() {return this._state.value != null && typeof this._state.value.toJSON === \"function\" ? this._state.value.toJSON() : this._state.value}\r\n\r\nfunction valid(stream) {return stream._state }\r\nfunction active(stream) {return stream._state.state === 1}\r\nfunction changed(stream) {return stream._state.changed}\r\nfunction notEnded(stream) {return stream._state.state !== 2}\r\n\r\nfunction merge(streams) {\r\n\treturn combine(function() {\r\n\t\treturn streams.map(function(s) {return s()})\r\n\t}, streams)\r\n}\r\n\r\nfunction scan(reducer, seed, stream) {\r\n\tvar newStream = combine(function (s) {\r\n\t\treturn seed = reducer(seed, s._state.value)\r\n\t}, [stream])\r\n\r\n\tif (newStream._state.state === 0) newStream(seed)\r\n\r\n\treturn newStream\r\n}\r\n\r\nfunction scanMerge(tuples, seed) {\r\n\tvar streams = tuples.map(function(tuple) {\r\n\t\tvar stream = tuple[0]\r\n\t\tif (stream._state.state === 0) stream(undefined)\r\n\t\treturn stream\r\n\t})\r\n\r\n\tvar newStream = combine(function() {\r\n\t\tvar changed = arguments[arguments.length - 1]\r\n\r\n\t\tstreams.forEach(function(stream, idx) {\r\n\t\t\tif (changed.indexOf(stream) > -1) {\r\n\t\t\t\tseed = tuples[idx][1](seed, stream._state.value)\r\n\t\t\t}\r\n\t\t})\r\n\r\n\t\treturn seed\r\n\t}, streams)\r\n\r\n\treturn newStream\r\n}\r\n\r\ncreateStream[\"fantasy-land/of\"] = createStream\r\ncreateStream.merge = merge\r\ncreateStream.combine = combine\r\ncreateStream.scan = scan\r\ncreateStream.scanMerge = scanMerge\r\ncreateStream.HALT = HALT\r\n\r\nif (true) module[\"exports\"] = createStream\r\nelse {}\r\n\r\n}());\r\n\n\n//# sourceURL=webpack:///./node_modules/mithril-stream/stream.js?");

/***/ }),

/***/ "./node_modules/mithril/mithril.js":
/*!*****************************************!*\
  !*** ./node_modules/mithril/mithril.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(setImmediate, global) {;(function() {\n\"use strict\"\nfunction Vnode(tag, key, attrs0, children, text, dom) {\n\treturn {tag: tag, key: key, attrs: attrs0, children: children, text: text, dom: dom, domSize: undefined, state: undefined, _state: undefined, events: undefined, instance: undefined, skip: false}\n}\nVnode.normalize = function(node) {\n\tif (Array.isArray(node)) return Vnode(\"[\", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)\n\tif (node != null && typeof node !== \"object\") return Vnode(\"#\", undefined, undefined, node === false ? \"\" : node, undefined, undefined)\n\treturn node\n}\nVnode.normalizeChildren = function normalizeChildren(children) {\n\tfor (var i = 0; i < children.length; i++) {\n\t\tchildren[i] = Vnode.normalize(children[i])\n\t}\n\treturn children\n}\nvar selectorParser = /(?:(^|#|\\.)([^#\\.\\[\\]]+))|(\\[(.+?)(?:\\s*=\\s*(\"|'|)((?:\\\\[\"'\\]]|.)*?)\\5)?\\])/g\nvar selectorCache = {}\nvar hasOwn = {}.hasOwnProperty\nfunction isEmpty(object) {\n\tfor (var key in object) if (hasOwn.call(object, key)) return false\n\treturn true\n}\nfunction compileSelector(selector) {\n\tvar match, tag = \"div\", classes = [], attrs = {}\n\twhile (match = selectorParser.exec(selector)) {\n\t\tvar type = match[1], value = match[2]\n\t\tif (type === \"\" && value !== \"\") tag = value\n\t\telse if (type === \"#\") attrs.id = value\n\t\telse if (type === \".\") classes.push(value)\n\t\telse if (match[3][0] === \"[\") {\n\t\t\tvar attrValue = match[6]\n\t\t\tif (attrValue) attrValue = attrValue.replace(/\\\\([\"'])/g, \"$1\").replace(/\\\\\\\\/g, \"\\\\\")\n\t\t\tif (match[4] === \"class\") classes.push(attrValue)\n\t\t\telse attrs[match[4]] = attrValue === \"\" ? attrValue : attrValue || true\n\t\t}\n\t}\n\tif (classes.length > 0) attrs.className = classes.join(\" \")\n\treturn selectorCache[selector] = {tag: tag, attrs: attrs}\n}\nfunction execSelector(state, attrs, children) {\n\tvar hasAttrs = false, childList, text\n\tvar className = attrs.className || attrs.class\n\tif (!isEmpty(state.attrs) && !isEmpty(attrs)) {\n\t\tvar newAttrs = {}\n\t\tfor(var key in attrs) {\n\t\t\tif (hasOwn.call(attrs, key)) {\n\t\t\t\tnewAttrs[key] = attrs[key]\n\t\t\t}\n\t\t}\n\t\tattrs = newAttrs\n\t}\n\tfor (var key in state.attrs) {\n\t\tif (hasOwn.call(state.attrs, key)) {\n\t\t\tattrs[key] = state.attrs[key]\n\t\t}\n\t}\n\tif (className !== undefined) {\n\t\tif (attrs.class !== undefined) {\n\t\t\tattrs.class = undefined\n\t\t\tattrs.className = className\n\t\t}\n\t\tif (state.attrs.className != null) {\n\t\t\tattrs.className = state.attrs.className + \" \" + className\n\t\t}\n\t}\n\tfor (var key in attrs) {\n\t\tif (hasOwn.call(attrs, key) && key !== \"key\") {\n\t\t\thasAttrs = true\n\t\t\tbreak\n\t\t}\n\t}\n\tif (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === \"#\") {\n\t\ttext = children[0].children\n\t} else {\n\t\tchildList = children\n\t}\n\treturn Vnode(state.tag, attrs.key, hasAttrs ? attrs : undefined, childList, text)\n}\nfunction hyperscript(selector) {\n\t// Because sloppy mode sucks\n\tvar attrs = arguments[1], start = 2, children\n\tif (selector == null || typeof selector !== \"string\" && typeof selector !== \"function\" && typeof selector.view !== \"function\") {\n\t\tthrow Error(\"The selector must be either a string or a component.\");\n\t}\n\tif (typeof selector === \"string\") {\n\t\tvar cached = selectorCache[selector] || compileSelector(selector)\n\t}\n\tif (attrs == null) {\n\t\tattrs = {}\n\t} else if (typeof attrs !== \"object\" || attrs.tag != null || Array.isArray(attrs)) {\n\t\tattrs = {}\n\t\tstart = 1\n\t}\n\tif (arguments.length === start + 1) {\n\t\tchildren = arguments[start]\n\t\tif (!Array.isArray(children)) children = [children]\n\t} else {\n\t\tchildren = []\n\t\twhile (start < arguments.length) children.push(arguments[start++])\n\t}\n\tvar normalized = Vnode.normalizeChildren(children)\n\tif (typeof selector === \"string\") {\n\t\treturn execSelector(cached, attrs, normalized)\n\t} else {\n\t\treturn Vnode(selector, attrs.key, attrs, normalized)\n\t}\n}\nhyperscript.trust = function(html) {\n\tif (html == null) html = \"\"\n\treturn Vnode(\"<\", undefined, undefined, html, undefined, undefined)\n}\nhyperscript.fragment = function(attrs1, children) {\n\treturn Vnode(\"[\", attrs1.key, attrs1, Vnode.normalizeChildren(children), undefined, undefined)\n}\nvar m = hyperscript\n/** @constructor */\nvar PromisePolyfill = function(executor) {\n\tif (!(this instanceof PromisePolyfill)) throw new Error(\"Promise must be called with `new`\")\n\tif (typeof executor !== \"function\") throw new TypeError(\"executor must be a function\")\n\tvar self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)\n\tvar instance = self._instance = {resolvers: resolvers, rejectors: rejectors}\n\tvar callAsync = typeof setImmediate === \"function\" ? setImmediate : setTimeout\n\tfunction handler(list, shouldAbsorb) {\n\t\treturn function execute(value) {\n\t\t\tvar then\n\t\t\ttry {\n\t\t\t\tif (shouldAbsorb && value != null && (typeof value === \"object\" || typeof value === \"function\") && typeof (then = value.then) === \"function\") {\n\t\t\t\t\tif (value === self) throw new TypeError(\"Promise can't be resolved w/ itself\")\n\t\t\t\t\texecuteOnce(then.bind(value))\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tcallAsync(function() {\n\t\t\t\t\t\tif (!shouldAbsorb && list.length === 0) console.error(\"Possible unhandled promise rejection:\", value)\n\t\t\t\t\t\tfor (var i = 0; i < list.length; i++) list[i](value)\n\t\t\t\t\t\tresolvers.length = 0, rejectors.length = 0\n\t\t\t\t\t\tinstance.state = shouldAbsorb\n\t\t\t\t\t\tinstance.retry = function() {execute(value)}\n\t\t\t\t\t})\n\t\t\t\t}\n\t\t\t}\n\t\t\tcatch (e) {\n\t\t\t\trejectCurrent(e)\n\t\t\t}\n\t\t}\n\t}\n\tfunction executeOnce(then) {\n\t\tvar runs = 0\n\t\tfunction run(fn) {\n\t\t\treturn function(value) {\n\t\t\t\tif (runs++ > 0) return\n\t\t\t\tfn(value)\n\t\t\t}\n\t\t}\n\t\tvar onerror = run(rejectCurrent)\n\t\ttry {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}\n\t}\n\texecuteOnce(executor)\n}\nPromisePolyfill.prototype.then = function(onFulfilled, onRejection) {\n\tvar self = this, instance = self._instance\n\tfunction handle(callback, list, next, state) {\n\t\tlist.push(function(value) {\n\t\t\tif (typeof callback !== \"function\") next(value)\n\t\t\telse try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}\n\t\t})\n\t\tif (typeof instance.retry === \"function\" && state === instance.state) instance.retry()\n\t}\n\tvar resolveNext, rejectNext\n\tvar promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})\n\thandle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)\n\treturn promise\n}\nPromisePolyfill.prototype.catch = function(onRejection) {\n\treturn this.then(null, onRejection)\n}\nPromisePolyfill.resolve = function(value) {\n\tif (value instanceof PromisePolyfill) return value\n\treturn new PromisePolyfill(function(resolve) {resolve(value)})\n}\nPromisePolyfill.reject = function(value) {\n\treturn new PromisePolyfill(function(resolve, reject) {reject(value)})\n}\nPromisePolyfill.all = function(list) {\n\treturn new PromisePolyfill(function(resolve, reject) {\n\t\tvar total = list.length, count = 0, values = []\n\t\tif (list.length === 0) resolve([])\n\t\telse for (var i = 0; i < list.length; i++) {\n\t\t\t(function(i) {\n\t\t\t\tfunction consume(value) {\n\t\t\t\t\tcount++\n\t\t\t\t\tvalues[i] = value\n\t\t\t\t\tif (count === total) resolve(values)\n\t\t\t\t}\n\t\t\t\tif (list[i] != null && (typeof list[i] === \"object\" || typeof list[i] === \"function\") && typeof list[i].then === \"function\") {\n\t\t\t\t\tlist[i].then(consume, reject)\n\t\t\t\t}\n\t\t\t\telse consume(list[i])\n\t\t\t})(i)\n\t\t}\n\t})\n}\nPromisePolyfill.race = function(list) {\n\treturn new PromisePolyfill(function(resolve, reject) {\n\t\tfor (var i = 0; i < list.length; i++) {\n\t\t\tlist[i].then(resolve, reject)\n\t\t}\n\t})\n}\nif (typeof window !== \"undefined\") {\n\tif (typeof window.Promise === \"undefined\") window.Promise = PromisePolyfill\n\tvar PromisePolyfill = window.Promise\n} else if (typeof global !== \"undefined\") {\n\tif (typeof global.Promise === \"undefined\") global.Promise = PromisePolyfill\n\tvar PromisePolyfill = global.Promise\n} else {\n}\nvar buildQueryString = function(object) {\n\tif (Object.prototype.toString.call(object) !== \"[object Object]\") return \"\"\n\tvar args = []\n\tfor (var key0 in object) {\n\t\tdestructure(key0, object[key0])\n\t}\n\treturn args.join(\"&\")\n\tfunction destructure(key0, value) {\n\t\tif (Array.isArray(value)) {\n\t\t\tfor (var i = 0; i < value.length; i++) {\n\t\t\t\tdestructure(key0 + \"[\" + i + \"]\", value[i])\n\t\t\t}\n\t\t}\n\t\telse if (Object.prototype.toString.call(value) === \"[object Object]\") {\n\t\t\tfor (var i in value) {\n\t\t\t\tdestructure(key0 + \"[\" + i + \"]\", value[i])\n\t\t\t}\n\t\t}\n\t\telse args.push(encodeURIComponent(key0) + (value != null && value !== \"\" ? \"=\" + encodeURIComponent(value) : \"\"))\n\t}\n}\nvar FILE_PROTOCOL_REGEX = new RegExp(\"^file://\", \"i\")\nvar _8 = function($window, Promise) {\n\tvar callbackCount = 0\n\tvar oncompletion\n\tfunction setCompletionCallback(callback) {oncompletion = callback}\n\tfunction finalizer() {\n\t\tvar count = 0\n\t\tfunction complete() {if (--count === 0 && typeof oncompletion === \"function\") oncompletion()}\n\t\treturn function finalize(promise0) {\n\t\t\tvar then0 = promise0.then\n\t\t\tpromise0.then = function() {\n\t\t\t\tcount++\n\t\t\t\tvar next = then0.apply(promise0, arguments)\n\t\t\t\tnext.then(complete, function(e) {\n\t\t\t\t\tcomplete()\n\t\t\t\t\tif (count === 0) throw e\n\t\t\t\t})\n\t\t\t\treturn finalize(next)\n\t\t\t}\n\t\t\treturn promise0\n\t\t}\n\t}\n\tfunction normalize(args, extra) {\n\t\tif (typeof args === \"string\") {\n\t\t\tvar url = args\n\t\t\targs = extra || {}\n\t\t\tif (args.url == null) args.url = url\n\t\t}\n\t\treturn args\n\t}\n\tfunction request(args, extra) {\n\t\tvar finalize = finalizer()\n\t\targs = normalize(args, extra)\n\t\tvar promise0 = new Promise(function(resolve, reject) {\n\t\t\tif (args.method == null) args.method = \"GET\"\n\t\t\targs.method = args.method.toUpperCase()\n\t\t\tvar useBody = (args.method === \"GET\" || args.method === \"TRACE\") ? false : (typeof args.useBody === \"boolean\" ? args.useBody : true)\n\t\t\tif (typeof args.serialize !== \"function\") args.serialize = typeof FormData !== \"undefined\" && args.data instanceof FormData ? function(value) {return value} : JSON.stringify\n\t\t\tif (typeof args.deserialize !== \"function\") args.deserialize = deserialize\n\t\t\tif (typeof args.extract !== \"function\") args.extract = extract\n\t\t\targs.url = interpolate(args.url, args.data)\n\t\t\tif (useBody) args.data = args.serialize(args.data)\n\t\t\telse args.url = assemble(args.url, args.data)\n\t\t\tvar xhr = new $window.XMLHttpRequest(),\n\t\t\t\taborted = false,\n\t\t\t\t_abort = xhr.abort\n\t\t\txhr.abort = function abort() {\n\t\t\t\taborted = true\n\t\t\t\t_abort.call(xhr)\n\t\t\t}\n\t\t\txhr.open(args.method, args.url, typeof args.async === \"boolean\" ? args.async : true, typeof args.user === \"string\" ? args.user : undefined, typeof args.password === \"string\" ? args.password : undefined)\n\t\t\tif (args.serialize === JSON.stringify && useBody && !(args.headers && args.headers.hasOwnProperty(\"Content-Type\"))) {\n\t\t\t\txhr.setRequestHeader(\"Content-Type\", \"application/json; charset=utf-8\")\n\t\t\t}\n\t\t\tif (args.deserialize === deserialize && !(args.headers && args.headers.hasOwnProperty(\"Accept\"))) {\n\t\t\t\txhr.setRequestHeader(\"Accept\", \"application/json, text/*\")\n\t\t\t}\n\t\t\tif (args.withCredentials) xhr.withCredentials = args.withCredentials\n\t\t\tfor (var key in args.headers) if ({}.hasOwnProperty.call(args.headers, key)) {\n\t\t\t\txhr.setRequestHeader(key, args.headers[key])\n\t\t\t}\n\t\t\tif (typeof args.config === \"function\") xhr = args.config(xhr, args) || xhr\n\t\t\txhr.onreadystatechange = function() {\n\t\t\t\t// Don't throw errors on xhr.abort().\n\t\t\t\tif(aborted) return\n\t\t\t\tif (xhr.readyState === 4) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\tvar response = (args.extract !== extract) ? args.extract(xhr, args) : args.deserialize(args.extract(xhr, args))\n\t\t\t\t\t\tif ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || FILE_PROTOCOL_REGEX.test(args.url)) {\n\t\t\t\t\t\t\tresolve(cast(args.type, response))\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tvar error = new Error(xhr.responseText)\n\t\t\t\t\t\t\tfor (var key in response) error[key] = response[key]\n\t\t\t\t\t\t\treject(error)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tcatch (e) {\n\t\t\t\t\t\treject(e)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (useBody && (args.data != null)) xhr.send(args.data)\n\t\t\telse xhr.send()\n\t\t})\n\t\treturn args.background === true ? promise0 : finalize(promise0)\n\t}\n\tfunction jsonp(args, extra) {\n\t\tvar finalize = finalizer()\n\t\targs = normalize(args, extra)\n\t\tvar promise0 = new Promise(function(resolve, reject) {\n\t\t\tvar callbackName = args.callbackName || \"_mithril_\" + Math.round(Math.random() * 1e16) + \"_\" + callbackCount++\n\t\t\tvar script = $window.document.createElement(\"script\")\n\t\t\t$window[callbackName] = function(data) {\n\t\t\t\tscript.parentNode.removeChild(script)\n\t\t\t\tresolve(cast(args.type, data))\n\t\t\t\tdelete $window[callbackName]\n\t\t\t}\n\t\t\tscript.onerror = function() {\n\t\t\t\tscript.parentNode.removeChild(script)\n\t\t\t\treject(new Error(\"JSONP request failed\"))\n\t\t\t\tdelete $window[callbackName]\n\t\t\t}\n\t\t\tif (args.data == null) args.data = {}\n\t\t\targs.url = interpolate(args.url, args.data)\n\t\t\targs.data[args.callbackKey || \"callback\"] = callbackName\n\t\t\tscript.src = assemble(args.url, args.data)\n\t\t\t$window.document.documentElement.appendChild(script)\n\t\t})\n\t\treturn args.background === true? promise0 : finalize(promise0)\n\t}\n\tfunction interpolate(url, data) {\n\t\tif (data == null) return url\n\t\tvar tokens = url.match(/:[^\\/]+/gi) || []\n\t\tfor (var i = 0; i < tokens.length; i++) {\n\t\t\tvar key = tokens[i].slice(1)\n\t\t\tif (data[key] != null) {\n\t\t\t\turl = url.replace(tokens[i], data[key])\n\t\t\t}\n\t\t}\n\t\treturn url\n\t}\n\tfunction assemble(url, data) {\n\t\tvar querystring = buildQueryString(data)\n\t\tif (querystring !== \"\") {\n\t\t\tvar prefix = url.indexOf(\"?\") < 0 ? \"?\" : \"&\"\n\t\t\turl += prefix + querystring\n\t\t}\n\t\treturn url\n\t}\n\tfunction deserialize(data) {\n\t\ttry {return data !== \"\" ? JSON.parse(data) : null}\n\t\tcatch (e) {throw new Error(data)}\n\t}\n\tfunction extract(xhr) {return xhr.responseText}\n\tfunction cast(type0, data) {\n\t\tif (typeof type0 === \"function\") {\n\t\t\tif (Array.isArray(data)) {\n\t\t\t\tfor (var i = 0; i < data.length; i++) {\n\t\t\t\t\tdata[i] = new type0(data[i])\n\t\t\t\t}\n\t\t\t}\n\t\t\telse return new type0(data)\n\t\t}\n\t\treturn data\n\t}\n\treturn {request: request, jsonp: jsonp, setCompletionCallback: setCompletionCallback}\n}\nvar requestService = _8(window, PromisePolyfill)\nvar coreRenderer = function($window) {\n\tvar $doc = $window.document\n\tvar $emptyFragment = $doc.createDocumentFragment()\n\tvar nameSpace = {\n\t\tsvg: \"http://www.w3.org/2000/svg\",\n\t\tmath: \"http://www.w3.org/1998/Math/MathML\"\n\t}\n\tvar onevent\n\tfunction setEventCallback(callback) {return onevent = callback}\n\tfunction getNameSpace(vnode) {\n\t\treturn vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]\n\t}\n\t//create\n\tfunction createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {\n\t\tfor (var i = start; i < end; i++) {\n\t\t\tvar vnode = vnodes[i]\n\t\t\tif (vnode != null) {\n\t\t\t\tcreateNode(parent, vnode, hooks, ns, nextSibling)\n\t\t\t}\n\t\t}\n\t}\n\tfunction createNode(parent, vnode, hooks, ns, nextSibling) {\n\t\tvar tag = vnode.tag\n\t\tif (typeof tag === \"string\") {\n\t\t\tvnode.state = {}\n\t\t\tif (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)\n\t\t\tswitch (tag) {\n\t\t\t\tcase \"#\": return createText(parent, vnode, nextSibling)\n\t\t\t\tcase \"<\": return createHTML(parent, vnode, nextSibling)\n\t\t\t\tcase \"[\": return createFragment(parent, vnode, hooks, ns, nextSibling)\n\t\t\t\tdefault: return createElement(parent, vnode, hooks, ns, nextSibling)\n\t\t\t}\n\t\t}\n\t\telse return createComponent(parent, vnode, hooks, ns, nextSibling)\n\t}\n\tfunction createText(parent, vnode, nextSibling) {\n\t\tvnode.dom = $doc.createTextNode(vnode.children)\n\t\tinsertNode(parent, vnode.dom, nextSibling)\n\t\treturn vnode.dom\n\t}\n\tfunction createHTML(parent, vnode, nextSibling) {\n\t\tvar match1 = vnode.children.match(/^\\s*?<(\\w+)/im) || []\n\t\tvar parent1 = {caption: \"table\", thead: \"table\", tbody: \"table\", tfoot: \"table\", tr: \"tbody\", th: \"tr\", td: \"tr\", colgroup: \"table\", col: \"colgroup\"}[match1[1]] || \"div\"\n\t\tvar temp = $doc.createElement(parent1)\n\t\ttemp.innerHTML = vnode.children\n\t\tvnode.dom = temp.firstChild\n\t\tvnode.domSize = temp.childNodes.length\n\t\tvar fragment = $doc.createDocumentFragment()\n\t\tvar child\n\t\twhile (child = temp.firstChild) {\n\t\t\tfragment.appendChild(child)\n\t\t}\n\t\tinsertNode(parent, fragment, nextSibling)\n\t\treturn fragment\n\t}\n\tfunction createFragment(parent, vnode, hooks, ns, nextSibling) {\n\t\tvar fragment = $doc.createDocumentFragment()\n\t\tif (vnode.children != null) {\n\t\t\tvar children = vnode.children\n\t\t\tcreateNodes(fragment, children, 0, children.length, hooks, null, ns)\n\t\t}\n\t\tvnode.dom = fragment.firstChild\n\t\tvnode.domSize = fragment.childNodes.length\n\t\tinsertNode(parent, fragment, nextSibling)\n\t\treturn fragment\n\t}\n\tfunction createElement(parent, vnode, hooks, ns, nextSibling) {\n\t\tvar tag = vnode.tag\n\t\tvar attrs2 = vnode.attrs\n\t\tvar is = attrs2 && attrs2.is\n\t\tns = getNameSpace(vnode) || ns\n\t\tvar element = ns ?\n\t\t\tis ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :\n\t\t\tis ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)\n\t\tvnode.dom = element\n\t\tif (attrs2 != null) {\n\t\t\tsetAttrs(vnode, attrs2, ns)\n\t\t}\n\t\tinsertNode(parent, element, nextSibling)\n\t\tif (vnode.attrs != null && vnode.attrs.contenteditable != null) {\n\t\t\tsetContentEditable(vnode)\n\t\t}\n\t\telse {\n\t\t\tif (vnode.text != null) {\n\t\t\t\tif (vnode.text !== \"\") element.textContent = vnode.text\n\t\t\t\telse vnode.children = [Vnode(\"#\", undefined, undefined, vnode.text, undefined, undefined)]\n\t\t\t}\n\t\t\tif (vnode.children != null) {\n\t\t\t\tvar children = vnode.children\n\t\t\t\tcreateNodes(element, children, 0, children.length, hooks, null, ns)\n\t\t\t\tsetLateAttrs(vnode)\n\t\t\t}\n\t\t}\n\t\treturn element\n\t}\n\tfunction initComponent(vnode, hooks) {\n\t\tvar sentinel\n\t\tif (typeof vnode.tag.view === \"function\") {\n\t\t\tvnode.state = Object.create(vnode.tag)\n\t\t\tsentinel = vnode.state.view\n\t\t\tif (sentinel.$$reentrantLock$$ != null) return $emptyFragment\n\t\t\tsentinel.$$reentrantLock$$ = true\n\t\t} else {\n\t\t\tvnode.state = void 0\n\t\t\tsentinel = vnode.tag\n\t\t\tif (sentinel.$$reentrantLock$$ != null) return $emptyFragment\n\t\t\tsentinel.$$reentrantLock$$ = true\n\t\t\tvnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === \"function\") ? new vnode.tag(vnode) : vnode.tag(vnode)\n\t\t}\n\t\tvnode._state = vnode.state\n\t\tif (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)\n\t\tinitLifecycle(vnode._state, vnode, hooks)\n\t\tvnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))\n\t\tif (vnode.instance === vnode) throw Error(\"A view cannot return the vnode it received as argument\")\n\t\tsentinel.$$reentrantLock$$ = null\n\t}\n\tfunction createComponent(parent, vnode, hooks, ns, nextSibling) {\n\t\tinitComponent(vnode, hooks)\n\t\tif (vnode.instance != null) {\n\t\t\tvar element = createNode(parent, vnode.instance, hooks, ns, nextSibling)\n\t\t\tvnode.dom = vnode.instance.dom\n\t\t\tvnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0\n\t\t\tinsertNode(parent, element, nextSibling)\n\t\t\treturn element\n\t\t}\n\t\telse {\n\t\t\tvnode.domSize = 0\n\t\t\treturn $emptyFragment\n\t\t}\n\t}\n\t//update\n\tfunction updateNodes(parent, old, vnodes, recycling, hooks, nextSibling, ns) {\n\t\tif (old === vnodes || old == null && vnodes == null) return\n\t\telse if (old == null) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)\n\t\telse if (vnodes == null) removeNodes(old, 0, old.length, vnodes)\n\t\telse {\n\t\t\tif (old.length === vnodes.length) {\n\t\t\t\tvar isUnkeyed = false\n\t\t\t\tfor (var i = 0; i < vnodes.length; i++) {\n\t\t\t\t\tif (vnodes[i] != null && old[i] != null) {\n\t\t\t\t\t\tisUnkeyed = vnodes[i].key == null && old[i].key == null\n\t\t\t\t\t\tbreak\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif (isUnkeyed) {\n\t\t\t\t\tfor (var i = 0; i < old.length; i++) {\n\t\t\t\t\t\tif (old[i] === vnodes[i]) continue\n\t\t\t\t\t\telse if (old[i] == null && vnodes[i] != null) createNode(parent, vnodes[i], hooks, ns, getNextSibling(old, i + 1, nextSibling))\n\t\t\t\t\t\telse if (vnodes[i] == null) removeNodes(old, i, i + 1, vnodes)\n\t\t\t\t\t\telse updateNode(parent, old[i], vnodes[i], hooks, getNextSibling(old, i + 1, nextSibling), recycling, ns)\n\t\t\t\t\t}\n\t\t\t\t\treturn\n\t\t\t\t}\n\t\t\t}\n\t\t\trecycling = recycling || isRecyclable(old, vnodes)\n\t\t\tif (recycling) {\n\t\t\t\tvar pool = old.pool\n\t\t\t\told = old.concat(old.pool)\n\t\t\t}\n\t\t\tvar oldStart = 0, start = 0, oldEnd = old.length - 1, end = vnodes.length - 1, map\n\t\t\twhile (oldEnd >= oldStart && end >= start) {\n\t\t\t\tvar o = old[oldStart], v = vnodes[start]\n\t\t\t\tif (o === v && !recycling) oldStart++, start++\n\t\t\t\telse if (o == null) oldStart++\n\t\t\t\telse if (v == null) start++\n\t\t\t\telse if (o.key === v.key) {\n\t\t\t\t\tvar shouldRecycle = (pool != null && oldStart >= old.length - pool.length) || ((pool == null) && recycling)\n\t\t\t\t\toldStart++, start++\n\t\t\t\t\tupdateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), shouldRecycle, ns)\n\t\t\t\t\tif (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tvar o = old[oldEnd]\n\t\t\t\t\tif (o === v && !recycling) oldEnd--, start++\n\t\t\t\t\telse if (o == null) oldEnd--\n\t\t\t\t\telse if (v == null) start++\n\t\t\t\t\telse if (o.key === v.key) {\n\t\t\t\t\t\tvar shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)\n\t\t\t\t\t\tupdateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)\n\t\t\t\t\t\tif (recycling || start < end) insertNode(parent, toFragment(o), getNextSibling(old, oldStart, nextSibling))\n\t\t\t\t\t\toldEnd--, start++\n\t\t\t\t\t}\n\t\t\t\t\telse break\n\t\t\t\t}\n\t\t\t}\n\t\t\twhile (oldEnd >= oldStart && end >= start) {\n\t\t\t\tvar o = old[oldEnd], v = vnodes[end]\n\t\t\t\tif (o === v && !recycling) oldEnd--, end--\n\t\t\t\telse if (o == null) oldEnd--\n\t\t\t\telse if (v == null) end--\n\t\t\t\telse if (o.key === v.key) {\n\t\t\t\t\tvar shouldRecycle = (pool != null && oldEnd >= old.length - pool.length) || ((pool == null) && recycling)\n\t\t\t\t\tupdateNode(parent, o, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), shouldRecycle, ns)\n\t\t\t\t\tif (recycling && o.tag === v.tag) insertNode(parent, toFragment(o), nextSibling)\n\t\t\t\t\tif (o.dom != null) nextSibling = o.dom\n\t\t\t\t\toldEnd--, end--\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tif (!map) map = getKeyMap(old, oldEnd)\n\t\t\t\t\tif (v != null) {\n\t\t\t\t\t\tvar oldIndex = map[v.key]\n\t\t\t\t\t\tif (oldIndex != null) {\n\t\t\t\t\t\t\tvar movable = old[oldIndex]\n\t\t\t\t\t\t\tvar shouldRecycle = (pool != null && oldIndex >= old.length - pool.length) || ((pool == null) && recycling)\n\t\t\t\t\t\t\tupdateNode(parent, movable, v, hooks, getNextSibling(old, oldEnd + 1, nextSibling), recycling, ns)\n\t\t\t\t\t\t\tinsertNode(parent, toFragment(movable), nextSibling)\n\t\t\t\t\t\t\told[oldIndex].skip = true\n\t\t\t\t\t\t\tif (movable.dom != null) nextSibling = movable.dom\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse {\n\t\t\t\t\t\t\tvar dom = createNode(parent, v, hooks, ns, nextSibling)\n\t\t\t\t\t\t\tnextSibling = dom\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tend--\n\t\t\t\t}\n\t\t\t\tif (end < start) break\n\t\t\t}\n\t\t\tcreateNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)\n\t\t\tremoveNodes(old, oldStart, oldEnd + 1, vnodes)\n\t\t}\n\t}\n\tfunction updateNode(parent, old, vnode, hooks, nextSibling, recycling, ns) {\n\t\tvar oldTag = old.tag, tag = vnode.tag\n\t\tif (oldTag === tag) {\n\t\t\tvnode.state = old.state\n\t\t\tvnode._state = old._state\n\t\t\tvnode.events = old.events\n\t\t\tif (!recycling && shouldNotUpdate(vnode, old)) return\n\t\t\tif (typeof oldTag === \"string\") {\n\t\t\t\tif (vnode.attrs != null) {\n\t\t\t\t\tif (recycling) {\n\t\t\t\t\t\tvnode.state = {}\n\t\t\t\t\t\tinitLifecycle(vnode.attrs, vnode, hooks)\n\t\t\t\t\t}\n\t\t\t\t\telse updateLifecycle(vnode.attrs, vnode, hooks)\n\t\t\t\t}\n\t\t\t\tswitch (oldTag) {\n\t\t\t\t\tcase \"#\": updateText(old, vnode); break\n\t\t\t\t\tcase \"<\": updateHTML(parent, old, vnode, nextSibling); break\n\t\t\t\t\tcase \"[\": updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns); break\n\t\t\t\t\tdefault: updateElement(old, vnode, recycling, hooks, ns)\n\t\t\t\t}\n\t\t\t}\n\t\t\telse updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns)\n\t\t}\n\t\telse {\n\t\t\tremoveNode(old, null)\n\t\t\tcreateNode(parent, vnode, hooks, ns, nextSibling)\n\t\t}\n\t}\n\tfunction updateText(old, vnode) {\n\t\tif (old.children.toString() !== vnode.children.toString()) {\n\t\t\told.dom.nodeValue = vnode.children\n\t\t}\n\t\tvnode.dom = old.dom\n\t}\n\tfunction updateHTML(parent, old, vnode, nextSibling) {\n\t\tif (old.children !== vnode.children) {\n\t\t\ttoFragment(old)\n\t\t\tcreateHTML(parent, vnode, nextSibling)\n\t\t}\n\t\telse vnode.dom = old.dom, vnode.domSize = old.domSize\n\t}\n\tfunction updateFragment(parent, old, vnode, recycling, hooks, nextSibling, ns) {\n\t\tupdateNodes(parent, old.children, vnode.children, recycling, hooks, nextSibling, ns)\n\t\tvar domSize = 0, children = vnode.children\n\t\tvnode.dom = null\n\t\tif (children != null) {\n\t\t\tfor (var i = 0; i < children.length; i++) {\n\t\t\t\tvar child = children[i]\n\t\t\t\tif (child != null && child.dom != null) {\n\t\t\t\t\tif (vnode.dom == null) vnode.dom = child.dom\n\t\t\t\t\tdomSize += child.domSize || 1\n\t\t\t\t}\n\t\t\t}\n\t\t\tif (domSize !== 1) vnode.domSize = domSize\n\t\t}\n\t}\n\tfunction updateElement(old, vnode, recycling, hooks, ns) {\n\t\tvar element = vnode.dom = old.dom\n\t\tns = getNameSpace(vnode) || ns\n\t\tif (vnode.tag === \"textarea\") {\n\t\t\tif (vnode.attrs == null) vnode.attrs = {}\n\t\t\tif (vnode.text != null) {\n\t\t\t\tvnode.attrs.value = vnode.text //FIXME handle0 multiple children\n\t\t\t\tvnode.text = undefined\n\t\t\t}\n\t\t}\n\t\tupdateAttrs(vnode, old.attrs, vnode.attrs, ns)\n\t\tif (vnode.attrs != null && vnode.attrs.contenteditable != null) {\n\t\t\tsetContentEditable(vnode)\n\t\t}\n\t\telse if (old.text != null && vnode.text != null && vnode.text !== \"\") {\n\t\t\tif (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text\n\t\t}\n\t\telse {\n\t\t\tif (old.text != null) old.children = [Vnode(\"#\", undefined, undefined, old.text, undefined, old.dom.firstChild)]\n\t\t\tif (vnode.text != null) vnode.children = [Vnode(\"#\", undefined, undefined, vnode.text, undefined, undefined)]\n\t\t\tupdateNodes(element, old.children, vnode.children, recycling, hooks, null, ns)\n\t\t}\n\t}\n\tfunction updateComponent(parent, old, vnode, hooks, nextSibling, recycling, ns) {\n\t\tif (recycling) {\n\t\t\tinitComponent(vnode, hooks)\n\t\t} else {\n\t\t\tvnode.instance = Vnode.normalize(vnode._state.view.call(vnode.state, vnode))\n\t\t\tif (vnode.instance === vnode) throw Error(\"A view cannot return the vnode it received as argument\")\n\t\t\tif (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)\n\t\t\tupdateLifecycle(vnode._state, vnode, hooks)\n\t\t}\n\t\tif (vnode.instance != null) {\n\t\t\tif (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)\n\t\t\telse updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, recycling, ns)\n\t\t\tvnode.dom = vnode.instance.dom\n\t\t\tvnode.domSize = vnode.instance.domSize\n\t\t}\n\t\telse if (old.instance != null) {\n\t\t\tremoveNode(old.instance, null)\n\t\t\tvnode.dom = undefined\n\t\t\tvnode.domSize = 0\n\t\t}\n\t\telse {\n\t\t\tvnode.dom = old.dom\n\t\t\tvnode.domSize = old.domSize\n\t\t}\n\t}\n\tfunction isRecyclable(old, vnodes) {\n\t\tif (old.pool != null && Math.abs(old.pool.length - vnodes.length) <= Math.abs(old.length - vnodes.length)) {\n\t\t\tvar oldChildrenLength = old[0] && old[0].children && old[0].children.length || 0\n\t\t\tvar poolChildrenLength = old.pool[0] && old.pool[0].children && old.pool[0].children.length || 0\n\t\t\tvar vnodesChildrenLength = vnodes[0] && vnodes[0].children && vnodes[0].children.length || 0\n\t\t\tif (Math.abs(poolChildrenLength - vnodesChildrenLength) <= Math.abs(oldChildrenLength - vnodesChildrenLength)) {\n\t\t\t\treturn true\n\t\t\t}\n\t\t}\n\t\treturn false\n\t}\n\tfunction getKeyMap(vnodes, end) {\n\t\tvar map = {}, i = 0\n\t\tfor (var i = 0; i < end; i++) {\n\t\t\tvar vnode = vnodes[i]\n\t\t\tif (vnode != null) {\n\t\t\t\tvar key2 = vnode.key\n\t\t\t\tif (key2 != null) map[key2] = i\n\t\t\t}\n\t\t}\n\t\treturn map\n\t}\n\tfunction toFragment(vnode) {\n\t\tvar count0 = vnode.domSize\n\t\tif (count0 != null || vnode.dom == null) {\n\t\t\tvar fragment = $doc.createDocumentFragment()\n\t\t\tif (count0 > 0) {\n\t\t\t\tvar dom = vnode.dom\n\t\t\t\twhile (--count0) fragment.appendChild(dom.nextSibling)\n\t\t\t\tfragment.insertBefore(dom, fragment.firstChild)\n\t\t\t}\n\t\t\treturn fragment\n\t\t}\n\t\telse return vnode.dom\n\t}\n\tfunction getNextSibling(vnodes, i, nextSibling) {\n\t\tfor (; i < vnodes.length; i++) {\n\t\t\tif (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom\n\t\t}\n\t\treturn nextSibling\n\t}\n\tfunction insertNode(parent, dom, nextSibling) {\n\t\tif (nextSibling && nextSibling.parentNode) parent.insertBefore(dom, nextSibling)\n\t\telse parent.appendChild(dom)\n\t}\n\tfunction setContentEditable(vnode) {\n\t\tvar children = vnode.children\n\t\tif (children != null && children.length === 1 && children[0].tag === \"<\") {\n\t\t\tvar content = children[0].children\n\t\t\tif (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content\n\t\t}\n\t\telse if (vnode.text != null || children != null && children.length !== 0) throw new Error(\"Child node of a contenteditable must be trusted\")\n\t}\n\t//remove\n\tfunction removeNodes(vnodes, start, end, context) {\n\t\tfor (var i = start; i < end; i++) {\n\t\t\tvar vnode = vnodes[i]\n\t\t\tif (vnode != null) {\n\t\t\t\tif (vnode.skip) vnode.skip = false\n\t\t\t\telse removeNode(vnode, context)\n\t\t\t}\n\t\t}\n\t}\n\tfunction removeNode(vnode, context) {\n\t\tvar expected = 1, called = 0\n\t\tif (vnode.attrs && typeof vnode.attrs.onbeforeremove === \"function\") {\n\t\t\tvar result = vnode.attrs.onbeforeremove.call(vnode.state, vnode)\n\t\t\tif (result != null && typeof result.then === \"function\") {\n\t\t\t\texpected++\n\t\t\t\tresult.then(continuation, continuation)\n\t\t\t}\n\t\t}\n\t\tif (typeof vnode.tag !== \"string\" && typeof vnode._state.onbeforeremove === \"function\") {\n\t\t\tvar result = vnode._state.onbeforeremove.call(vnode.state, vnode)\n\t\t\tif (result != null && typeof result.then === \"function\") {\n\t\t\t\texpected++\n\t\t\t\tresult.then(continuation, continuation)\n\t\t\t}\n\t\t}\n\t\tcontinuation()\n\t\tfunction continuation() {\n\t\t\tif (++called === expected) {\n\t\t\t\tonremove(vnode)\n\t\t\t\tif (vnode.dom) {\n\t\t\t\t\tvar count0 = vnode.domSize || 1\n\t\t\t\t\tif (count0 > 1) {\n\t\t\t\t\t\tvar dom = vnode.dom\n\t\t\t\t\t\twhile (--count0) {\n\t\t\t\t\t\t\tremoveNodeFromDOM(dom.nextSibling)\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tremoveNodeFromDOM(vnode.dom)\n\t\t\t\t\tif (context != null && vnode.domSize == null && !hasIntegrationMethods(vnode.attrs) && typeof vnode.tag === \"string\") { //TODO test custom elements\n\t\t\t\t\t\tif (!context.pool) context.pool = [vnode]\n\t\t\t\t\t\telse context.pool.push(vnode)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\tfunction removeNodeFromDOM(node) {\n\t\tvar parent = node.parentNode\n\t\tif (parent != null) parent.removeChild(node)\n\t}\n\tfunction onremove(vnode) {\n\t\tif (vnode.attrs && typeof vnode.attrs.onremove === \"function\") vnode.attrs.onremove.call(vnode.state, vnode)\n\t\tif (typeof vnode.tag !== \"string\") {\n\t\t\tif (typeof vnode._state.onremove === \"function\") vnode._state.onremove.call(vnode.state, vnode)\n\t\t\tif (vnode.instance != null) onremove(vnode.instance)\n\t\t} else {\n\t\t\tvar children = vnode.children\n\t\t\tif (Array.isArray(children)) {\n\t\t\t\tfor (var i = 0; i < children.length; i++) {\n\t\t\t\t\tvar child = children[i]\n\t\t\t\t\tif (child != null) onremove(child)\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t//attrs2\n\tfunction setAttrs(vnode, attrs2, ns) {\n\t\tfor (var key2 in attrs2) {\n\t\t\tsetAttr(vnode, key2, null, attrs2[key2], ns)\n\t\t}\n\t}\n\tfunction setAttr(vnode, key2, old, value, ns) {\n\t\tvar element = vnode.dom\n\t\tif (key2 === \"key\" || key2 === \"is\" || (old === value && !isFormAttribute(vnode, key2)) && typeof value !== \"object\" || typeof value === \"undefined\" || isLifecycleMethod(key2)) return\n\t\tvar nsLastIndex = key2.indexOf(\":\")\n\t\tif (nsLastIndex > -1 && key2.substr(0, nsLastIndex) === \"xlink\") {\n\t\t\telement.setAttributeNS(\"http://www.w3.org/1999/xlink\", key2.slice(nsLastIndex + 1), value)\n\t\t}\n\t\telse if (key2[0] === \"o\" && key2[1] === \"n\" && typeof value === \"function\") updateEvent(vnode, key2, value)\n\t\telse if (key2 === \"style\") updateStyle(element, old, value)\n\t\telse if (key2 in element && !isAttribute(key2) && ns === undefined && !isCustomElement(vnode)) {\n\t\t\tif (key2 === \"value\") {\n\t\t\t\tvar normalized0 = \"\" + value // eslint-disable-line no-implicit-coercion\n\t\t\t\t//setting input[value] to same value by typing on focused element moves cursor to end in Chrome\n\t\t\t\tif ((vnode.tag === \"input\" || vnode.tag === \"textarea\") && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return\n\t\t\t\t//setting select[value] to same value while having select open blinks select dropdown in Chrome\n\t\t\t\tif (vnode.tag === \"select\") {\n\t\t\t\t\tif (value === null) {\n\t\t\t\t\t\tif (vnode.dom.selectedIndex === -1 && vnode.dom === $doc.activeElement) return\n\t\t\t\t\t} else {\n\t\t\t\t\t\tif (old !== null && vnode.dom.value === normalized0 && vnode.dom === $doc.activeElement) return\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t//setting option[value] to same value while having select open blinks select dropdown in Chrome\n\t\t\t\tif (vnode.tag === \"option\" && old != null && vnode.dom.value === normalized0) return\n\t\t\t}\n\t\t\t// If you assign an input type1 that is not supported by IE 11 with an assignment expression, an error0 will occur.\n\t\t\tif (vnode.tag === \"input\" && key2 === \"type\") {\n\t\t\t\telement.setAttribute(key2, value)\n\t\t\t\treturn\n\t\t\t}\n\t\t\telement[key2] = value\n\t\t}\n\t\telse {\n\t\t\tif (typeof value === \"boolean\") {\n\t\t\t\tif (value) element.setAttribute(key2, \"\")\n\t\t\t\telse element.removeAttribute(key2)\n\t\t\t}\n\t\t\telse element.setAttribute(key2 === \"className\" ? \"class\" : key2, value)\n\t\t}\n\t}\n\tfunction setLateAttrs(vnode) {\n\t\tvar attrs2 = vnode.attrs\n\t\tif (vnode.tag === \"select\" && attrs2 != null) {\n\t\t\tif (\"value\" in attrs2) setAttr(vnode, \"value\", null, attrs2.value, undefined)\n\t\t\tif (\"selectedIndex\" in attrs2) setAttr(vnode, \"selectedIndex\", null, attrs2.selectedIndex, undefined)\n\t\t}\n\t}\n\tfunction updateAttrs(vnode, old, attrs2, ns) {\n\t\tif (attrs2 != null) {\n\t\t\tfor (var key2 in attrs2) {\n\t\t\t\tsetAttr(vnode, key2, old && old[key2], attrs2[key2], ns)\n\t\t\t}\n\t\t}\n\t\tif (old != null) {\n\t\t\tfor (var key2 in old) {\n\t\t\t\tif (attrs2 == null || !(key2 in attrs2)) {\n\t\t\t\t\tif (key2 === \"className\") key2 = \"class\"\n\t\t\t\t\tif (key2[0] === \"o\" && key2[1] === \"n\" && !isLifecycleMethod(key2)) updateEvent(vnode, key2, undefined)\n\t\t\t\t\telse if (key2 !== \"key\") vnode.dom.removeAttribute(key2)\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\tfunction isFormAttribute(vnode, attr) {\n\t\treturn attr === \"value\" || attr === \"checked\" || attr === \"selectedIndex\" || attr === \"selected\" && vnode.dom === $doc.activeElement\n\t}\n\tfunction isLifecycleMethod(attr) {\n\t\treturn attr === \"oninit\" || attr === \"oncreate\" || attr === \"onupdate\" || attr === \"onremove\" || attr === \"onbeforeremove\" || attr === \"onbeforeupdate\"\n\t}\n\tfunction isAttribute(attr) {\n\t\treturn attr === \"href\" || attr === \"list\" || attr === \"form\" || attr === \"width\" || attr === \"height\"// || attr === \"type\"\n\t}\n\tfunction isCustomElement(vnode){\n\t\treturn vnode.attrs.is || vnode.tag.indexOf(\"-\") > -1\n\t}\n\tfunction hasIntegrationMethods(source) {\n\t\treturn source != null && (source.oncreate || source.onupdate || source.onbeforeremove || source.onremove)\n\t}\n\t//style\n\tfunction updateStyle(element, old, style) {\n\t\tif (old === style) element.style.cssText = \"\", old = null\n\t\tif (style == null) element.style.cssText = \"\"\n\t\telse if (typeof style === \"string\") element.style.cssText = style\n\t\telse {\n\t\t\tif (typeof old === \"string\") element.style.cssText = \"\"\n\t\t\tfor (var key2 in style) {\n\t\t\t\telement.style[key2] = style[key2]\n\t\t\t}\n\t\t\tif (old != null && typeof old !== \"string\") {\n\t\t\t\tfor (var key2 in old) {\n\t\t\t\t\tif (!(key2 in style)) element.style[key2] = \"\"\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\t//event\n\tfunction updateEvent(vnode, key2, value) {\n\t\tvar element = vnode.dom\n\t\tvar callback = typeof onevent !== \"function\" ? value : function(e) {\n\t\t\tvar result = value.call(element, e)\n\t\t\tonevent.call(element, e)\n\t\t\treturn result\n\t\t}\n\t\tif (key2 in element) element[key2] = typeof value === \"function\" ? callback : null\n\t\telse {\n\t\t\tvar eventName = key2.slice(2)\n\t\t\tif (vnode.events === undefined) vnode.events = {}\n\t\t\tif (vnode.events[key2] === callback) return\n\t\t\tif (vnode.events[key2] != null) element.removeEventListener(eventName, vnode.events[key2], false)\n\t\t\tif (typeof value === \"function\") {\n\t\t\t\tvnode.events[key2] = callback\n\t\t\t\telement.addEventListener(eventName, vnode.events[key2], false)\n\t\t\t}\n\t\t}\n\t}\n\t//lifecycle\n\tfunction initLifecycle(source, vnode, hooks) {\n\t\tif (typeof source.oninit === \"function\") source.oninit.call(vnode.state, vnode)\n\t\tif (typeof source.oncreate === \"function\") hooks.push(source.oncreate.bind(vnode.state, vnode))\n\t}\n\tfunction updateLifecycle(source, vnode, hooks) {\n\t\tif (typeof source.onupdate === \"function\") hooks.push(source.onupdate.bind(vnode.state, vnode))\n\t}\n\tfunction shouldNotUpdate(vnode, old) {\n\t\tvar forceVnodeUpdate, forceComponentUpdate\n\t\tif (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === \"function\") forceVnodeUpdate = vnode.attrs.onbeforeupdate.call(vnode.state, vnode, old)\n\t\tif (typeof vnode.tag !== \"string\" && typeof vnode._state.onbeforeupdate === \"function\") forceComponentUpdate = vnode._state.onbeforeupdate.call(vnode.state, vnode, old)\n\t\tif (!(forceVnodeUpdate === undefined && forceComponentUpdate === undefined) && !forceVnodeUpdate && !forceComponentUpdate) {\n\t\t\tvnode.dom = old.dom\n\t\t\tvnode.domSize = old.domSize\n\t\t\tvnode.instance = old.instance\n\t\t\treturn true\n\t\t}\n\t\treturn false\n\t}\n\tfunction render(dom, vnodes) {\n\t\tif (!dom) throw new Error(\"Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.\")\n\t\tvar hooks = []\n\t\tvar active = $doc.activeElement\n\t\tvar namespace = dom.namespaceURI\n\t\t// First time0 rendering into a node clears it out\n\t\tif (dom.vnodes == null) dom.textContent = \"\"\n\t\tif (!Array.isArray(vnodes)) vnodes = [vnodes]\n\t\tupdateNodes(dom, dom.vnodes, Vnode.normalizeChildren(vnodes), false, hooks, null, namespace === \"http://www.w3.org/1999/xhtml\" ? undefined : namespace)\n\t\tdom.vnodes = vnodes\n\t\t// document.activeElement can return null in IE https://developer.mozilla.org/en-US/docs/Web/API/Document/activeElement\n\t\tif (active != null && $doc.activeElement !== active) active.focus()\n\t\tfor (var i = 0; i < hooks.length; i++) hooks[i]()\n\t}\n\treturn {render: render, setEventCallback: setEventCallback}\n}\nfunction throttle(callback) {\n\t//60fps translates to 16.6ms, round it down since setTimeout requires int\n\tvar time = 16\n\tvar last = 0, pending = null\n\tvar timeout = typeof requestAnimationFrame === \"function\" ? requestAnimationFrame : setTimeout\n\treturn function() {\n\t\tvar now = Date.now()\n\t\tif (last === 0 || now - last >= time) {\n\t\t\tlast = now\n\t\t\tcallback()\n\t\t}\n\t\telse if (pending === null) {\n\t\t\tpending = timeout(function() {\n\t\t\t\tpending = null\n\t\t\t\tcallback()\n\t\t\t\tlast = Date.now()\n\t\t\t}, time - (now - last))\n\t\t}\n\t}\n}\nvar _11 = function($window) {\n\tvar renderService = coreRenderer($window)\n\trenderService.setEventCallback(function(e) {\n\t\tif (e.redraw === false) e.redraw = undefined\n\t\telse redraw()\n\t})\n\tvar callbacks = []\n\tfunction subscribe(key1, callback) {\n\t\tunsubscribe(key1)\n\t\tcallbacks.push(key1, throttle(callback))\n\t}\n\tfunction unsubscribe(key1) {\n\t\tvar index = callbacks.indexOf(key1)\n\t\tif (index > -1) callbacks.splice(index, 2)\n\t}\n\tfunction redraw() {\n\t\tfor (var i = 1; i < callbacks.length; i += 2) {\n\t\t\tcallbacks[i]()\n\t\t}\n\t}\n\treturn {subscribe: subscribe, unsubscribe: unsubscribe, redraw: redraw, render: renderService.render}\n}\nvar redrawService = _11(window)\nrequestService.setCompletionCallback(redrawService.redraw)\nvar _16 = function(redrawService0) {\n\treturn function(root, component) {\n\t\tif (component === null) {\n\t\t\tredrawService0.render(root, [])\n\t\t\tredrawService0.unsubscribe(root)\n\t\t\treturn\n\t\t}\n\t\t\n\t\tif (component.view == null && typeof component !== \"function\") throw new Error(\"m.mount(element, component) expects a component, not a vnode\")\n\t\t\n\t\tvar run0 = function() {\n\t\t\tredrawService0.render(root, Vnode(component))\n\t\t}\n\t\tredrawService0.subscribe(root, run0)\n\t\tredrawService0.redraw()\n\t}\n}\nm.mount = _16(redrawService)\nvar Promise = PromisePolyfill\nvar parseQueryString = function(string) {\n\tif (string === \"\" || string == null) return {}\n\tif (string.charAt(0) === \"?\") string = string.slice(1)\n\tvar entries = string.split(\"&\"), data0 = {}, counters = {}\n\tfor (var i = 0; i < entries.length; i++) {\n\t\tvar entry = entries[i].split(\"=\")\n\t\tvar key5 = decodeURIComponent(entry[0])\n\t\tvar value = entry.length === 2 ? decodeURIComponent(entry[1]) : \"\"\n\t\tif (value === \"true\") value = true\n\t\telse if (value === \"false\") value = false\n\t\tvar levels = key5.split(/\\]\\[?|\\[/)\n\t\tvar cursor = data0\n\t\tif (key5.indexOf(\"[\") > -1) levels.pop()\n\t\tfor (var j = 0; j < levels.length; j++) {\n\t\t\tvar level = levels[j], nextLevel = levels[j + 1]\n\t\t\tvar isNumber = nextLevel == \"\" || !isNaN(parseInt(nextLevel, 10))\n\t\t\tvar isValue = j === levels.length - 1\n\t\t\tif (level === \"\") {\n\t\t\t\tvar key5 = levels.slice(0, j).join()\n\t\t\t\tif (counters[key5] == null) counters[key5] = 0\n\t\t\t\tlevel = counters[key5]++\n\t\t\t}\n\t\t\tif (cursor[level] == null) {\n\t\t\t\tcursor[level] = isValue ? value : isNumber ? [] : {}\n\t\t\t}\n\t\t\tcursor = cursor[level]\n\t\t}\n\t}\n\treturn data0\n}\nvar coreRouter = function($window) {\n\tvar supportsPushState = typeof $window.history.pushState === \"function\"\n\tvar callAsync0 = typeof setImmediate === \"function\" ? setImmediate : setTimeout\n\tfunction normalize1(fragment0) {\n\t\tvar data = $window.location[fragment0].replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)\n\t\tif (fragment0 === \"pathname\" && data[0] !== \"/\") data = \"/\" + data\n\t\treturn data\n\t}\n\tvar asyncId\n\tfunction debounceAsync(callback0) {\n\t\treturn function() {\n\t\t\tif (asyncId != null) return\n\t\t\tasyncId = callAsync0(function() {\n\t\t\t\tasyncId = null\n\t\t\t\tcallback0()\n\t\t\t})\n\t\t}\n\t}\n\tfunction parsePath(path, queryData, hashData) {\n\t\tvar queryIndex = path.indexOf(\"?\")\n\t\tvar hashIndex = path.indexOf(\"#\")\n\t\tvar pathEnd = queryIndex > -1 ? queryIndex : hashIndex > -1 ? hashIndex : path.length\n\t\tif (queryIndex > -1) {\n\t\t\tvar queryEnd = hashIndex > -1 ? hashIndex : path.length\n\t\t\tvar queryParams = parseQueryString(path.slice(queryIndex + 1, queryEnd))\n\t\t\tfor (var key4 in queryParams) queryData[key4] = queryParams[key4]\n\t\t}\n\t\tif (hashIndex > -1) {\n\t\t\tvar hashParams = parseQueryString(path.slice(hashIndex + 1))\n\t\t\tfor (var key4 in hashParams) hashData[key4] = hashParams[key4]\n\t\t}\n\t\treturn path.slice(0, pathEnd)\n\t}\n\tvar router = {prefix: \"#!\"}\n\trouter.getPath = function() {\n\t\tvar type2 = router.prefix.charAt(0)\n\t\tswitch (type2) {\n\t\t\tcase \"#\": return normalize1(\"hash\").slice(router.prefix.length)\n\t\t\tcase \"?\": return normalize1(\"search\").slice(router.prefix.length) + normalize1(\"hash\")\n\t\t\tdefault: return normalize1(\"pathname\").slice(router.prefix.length) + normalize1(\"search\") + normalize1(\"hash\")\n\t\t}\n\t}\n\trouter.setPath = function(path, data, options) {\n\t\tvar queryData = {}, hashData = {}\n\t\tpath = parsePath(path, queryData, hashData)\n\t\tif (data != null) {\n\t\t\tfor (var key4 in data) queryData[key4] = data[key4]\n\t\t\tpath = path.replace(/:([^\\/]+)/g, function(match2, token) {\n\t\t\t\tdelete queryData[token]\n\t\t\t\treturn data[token]\n\t\t\t})\n\t\t}\n\t\tvar query = buildQueryString(queryData)\n\t\tif (query) path += \"?\" + query\n\t\tvar hash = buildQueryString(hashData)\n\t\tif (hash) path += \"#\" + hash\n\t\tif (supportsPushState) {\n\t\t\tvar state = options ? options.state : null\n\t\t\tvar title = options ? options.title : null\n\t\t\t$window.onpopstate()\n\t\t\tif (options && options.replace) $window.history.replaceState(state, title, router.prefix + path)\n\t\t\telse $window.history.pushState(state, title, router.prefix + path)\n\t\t}\n\t\telse $window.location.href = router.prefix + path\n\t}\n\trouter.defineRoutes = function(routes, resolve, reject) {\n\t\tfunction resolveRoute() {\n\t\t\tvar path = router.getPath()\n\t\t\tvar params = {}\n\t\t\tvar pathname = parsePath(path, params, params)\n\t\t\tvar state = $window.history.state\n\t\t\tif (state != null) {\n\t\t\t\tfor (var k in state) params[k] = state[k]\n\t\t\t}\n\t\t\tfor (var route0 in routes) {\n\t\t\t\tvar matcher = new RegExp(\"^\" + route0.replace(/:[^\\/]+?\\.{3}/g, \"(.*?)\").replace(/:[^\\/]+/g, \"([^\\\\/]+)\") + \"\\/?$\")\n\t\t\t\tif (matcher.test(pathname)) {\n\t\t\t\t\tpathname.replace(matcher, function() {\n\t\t\t\t\t\tvar keys = route0.match(/:[^\\/]+/g) || []\n\t\t\t\t\t\tvar values = [].slice.call(arguments, 1, -2)\n\t\t\t\t\t\tfor (var i = 0; i < keys.length; i++) {\n\t\t\t\t\t\t\tparams[keys[i].replace(/:|\\./g, \"\")] = decodeURIComponent(values[i])\n\t\t\t\t\t\t}\n\t\t\t\t\t\tresolve(routes[route0], params, path, route0)\n\t\t\t\t\t})\n\t\t\t\t\treturn\n\t\t\t\t}\n\t\t\t}\n\t\t\treject(path, params)\n\t\t}\n\t\tif (supportsPushState) $window.onpopstate = debounceAsync(resolveRoute)\n\t\telse if (router.prefix.charAt(0) === \"#\") $window.onhashchange = resolveRoute\n\t\tresolveRoute()\n\t}\n\treturn router\n}\nvar _20 = function($window, redrawService0) {\n\tvar routeService = coreRouter($window)\n\tvar identity = function(v) {return v}\n\tvar render1, component, attrs3, currentPath, lastUpdate\n\tvar route = function(root, defaultRoute, routes) {\n\t\tif (root == null) throw new Error(\"Ensure the DOM element that was passed to `m.route` is not undefined\")\n\t\tvar run1 = function() {\n\t\t\tif (render1 != null) redrawService0.render(root, render1(Vnode(component, attrs3.key, attrs3)))\n\t\t}\n\t\tvar bail = function(path) {\n\t\t\tif (path !== defaultRoute) routeService.setPath(defaultRoute, null, {replace: true})\n\t\t\telse throw new Error(\"Could not resolve default route \" + defaultRoute)\n\t\t}\n\t\trouteService.defineRoutes(routes, function(payload, params, path) {\n\t\t\tvar update = lastUpdate = function(routeResolver, comp) {\n\t\t\t\tif (update !== lastUpdate) return\n\t\t\t\tcomponent = comp != null && (typeof comp.view === \"function\" || typeof comp === \"function\")? comp : \"div\"\n\t\t\t\tattrs3 = params, currentPath = path, lastUpdate = null\n\t\t\t\trender1 = (routeResolver.render || identity).bind(routeResolver)\n\t\t\t\trun1()\n\t\t\t}\n\t\t\tif (payload.view || typeof payload === \"function\") update({}, payload)\n\t\t\telse {\n\t\t\t\tif (payload.onmatch) {\n\t\t\t\t\tPromise.resolve(payload.onmatch(params, path)).then(function(resolved) {\n\t\t\t\t\t\tupdate(payload, resolved)\n\t\t\t\t\t}, bail)\n\t\t\t\t}\n\t\t\t\telse update(payload, \"div\")\n\t\t\t}\n\t\t}, bail)\n\t\tredrawService0.subscribe(root, run1)\n\t}\n\troute.set = function(path, data, options) {\n\t\tif (lastUpdate != null) {\n\t\t\toptions = options || {}\n\t\t\toptions.replace = true\n\t\t}\n\t\tlastUpdate = null\n\t\trouteService.setPath(path, data, options)\n\t}\n\troute.get = function() {return currentPath}\n\troute.prefix = function(prefix0) {routeService.prefix = prefix0}\n\troute.link = function(vnode1) {\n\t\tvnode1.dom.setAttribute(\"href\", routeService.prefix + vnode1.attrs.href)\n\t\tvnode1.dom.onclick = function(e) {\n\t\t\tif (e.ctrlKey || e.metaKey || e.shiftKey || e.which === 2) return\n\t\t\te.preventDefault()\n\t\t\te.redraw = false\n\t\t\tvar href = this.getAttribute(\"href\")\n\t\t\tif (href.indexOf(routeService.prefix) === 0) href = href.slice(routeService.prefix.length)\n\t\t\troute.set(href, undefined, undefined)\n\t\t}\n\t}\n\troute.param = function(key3) {\n\t\tif(typeof attrs3 !== \"undefined\" && typeof key3 !== \"undefined\") return attrs3[key3]\n\t\treturn attrs3\n\t}\n\treturn route\n}\nm.route = _20(window, redrawService)\nm.withAttr = function(attrName, callback1, context) {\n\treturn function(e) {\n\t\tcallback1.call(context || this, attrName in e.currentTarget ? e.currentTarget[attrName] : e.currentTarget.getAttribute(attrName))\n\t}\n}\nvar _28 = coreRenderer(window)\nm.render = _28.render\nm.redraw = redrawService.redraw\nm.request = requestService.request\nm.jsonp = requestService.jsonp\nm.parseQueryString = parseQueryString\nm.buildQueryString = buildQueryString\nm.version = \"1.1.6\"\nm.vnode = Vnode\nif (true) module[\"exports\"] = m\nelse {}\n}());\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../timers-browserify/main.js */ \"./node_modules/timers-browserify/main.js\").setImmediate, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/mithril/mithril.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack:///./node_modules/process/browser.js?");

/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {\n    \"use strict\";\n\n    if (global.setImmediate) {\n        return;\n    }\n\n    var nextHandle = 1; // Spec says greater than zero\n    var tasksByHandle = {};\n    var currentlyRunningATask = false;\n    var doc = global.document;\n    var registerImmediate;\n\n    function setImmediate(callback) {\n      // Callback can either be a function or a string\n      if (typeof callback !== \"function\") {\n        callback = new Function(\"\" + callback);\n      }\n      // Copy function arguments\n      var args = new Array(arguments.length - 1);\n      for (var i = 0; i < args.length; i++) {\n          args[i] = arguments[i + 1];\n      }\n      // Store and register the task\n      var task = { callback: callback, args: args };\n      tasksByHandle[nextHandle] = task;\n      registerImmediate(nextHandle);\n      return nextHandle++;\n    }\n\n    function clearImmediate(handle) {\n        delete tasksByHandle[handle];\n    }\n\n    function run(task) {\n        var callback = task.callback;\n        var args = task.args;\n        switch (args.length) {\n        case 0:\n            callback();\n            break;\n        case 1:\n            callback(args[0]);\n            break;\n        case 2:\n            callback(args[0], args[1]);\n            break;\n        case 3:\n            callback(args[0], args[1], args[2]);\n            break;\n        default:\n            callback.apply(undefined, args);\n            break;\n        }\n    }\n\n    function runIfPresent(handle) {\n        // From the spec: \"Wait until any invocations of this algorithm started before this one have completed.\"\n        // So if we're currently running a task, we'll need to delay this invocation.\n        if (currentlyRunningATask) {\n            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a\n            // \"too much recursion\" error.\n            setTimeout(runIfPresent, 0, handle);\n        } else {\n            var task = tasksByHandle[handle];\n            if (task) {\n                currentlyRunningATask = true;\n                try {\n                    run(task);\n                } finally {\n                    clearImmediate(handle);\n                    currentlyRunningATask = false;\n                }\n            }\n        }\n    }\n\n    function installNextTickImplementation() {\n        registerImmediate = function(handle) {\n            process.nextTick(function () { runIfPresent(handle); });\n        };\n    }\n\n    function canUsePostMessage() {\n        // The test against `importScripts` prevents this implementation from being installed inside a web worker,\n        // where `global.postMessage` means something completely different and can't be used for this purpose.\n        if (global.postMessage && !global.importScripts) {\n            var postMessageIsAsynchronous = true;\n            var oldOnMessage = global.onmessage;\n            global.onmessage = function() {\n                postMessageIsAsynchronous = false;\n            };\n            global.postMessage(\"\", \"*\");\n            global.onmessage = oldOnMessage;\n            return postMessageIsAsynchronous;\n        }\n    }\n\n    function installPostMessageImplementation() {\n        // Installs an event handler on `global` for the `message` event: see\n        // * https://developer.mozilla.org/en/DOM/window.postMessage\n        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages\n\n        var messagePrefix = \"setImmediate$\" + Math.random() + \"$\";\n        var onGlobalMessage = function(event) {\n            if (event.source === global &&\n                typeof event.data === \"string\" &&\n                event.data.indexOf(messagePrefix) === 0) {\n                runIfPresent(+event.data.slice(messagePrefix.length));\n            }\n        };\n\n        if (global.addEventListener) {\n            global.addEventListener(\"message\", onGlobalMessage, false);\n        } else {\n            global.attachEvent(\"onmessage\", onGlobalMessage);\n        }\n\n        registerImmediate = function(handle) {\n            global.postMessage(messagePrefix + handle, \"*\");\n        };\n    }\n\n    function installMessageChannelImplementation() {\n        var channel = new MessageChannel();\n        channel.port1.onmessage = function(event) {\n            var handle = event.data;\n            runIfPresent(handle);\n        };\n\n        registerImmediate = function(handle) {\n            channel.port2.postMessage(handle);\n        };\n    }\n\n    function installReadyStateChangeImplementation() {\n        var html = doc.documentElement;\n        registerImmediate = function(handle) {\n            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted\n            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.\n            var script = doc.createElement(\"script\");\n            script.onreadystatechange = function () {\n                runIfPresent(handle);\n                script.onreadystatechange = null;\n                html.removeChild(script);\n                script = null;\n            };\n            html.appendChild(script);\n        };\n    }\n\n    function installSetTimeoutImplementation() {\n        registerImmediate = function(handle) {\n            setTimeout(runIfPresent, 0, handle);\n        };\n    }\n\n    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.\n    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);\n    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;\n\n    // Don't get fooled by e.g. browserify environments.\n    if ({}.toString.call(global.process) === \"[object process]\") {\n        // For Node.js before 0.9\n        installNextTickImplementation();\n\n    } else if (canUsePostMessage()) {\n        // For non-IE10 modern browsers\n        installPostMessageImplementation();\n\n    } else if (global.MessageChannel) {\n        // For web workers, where supported\n        installMessageChannelImplementation();\n\n    } else if (doc && \"onreadystatechange\" in doc.createElement(\"script\")) {\n        // For IE 6–8\n        installReadyStateChangeImplementation();\n\n    } else {\n        // For older browsers\n        installSetTimeoutImplementation();\n    }\n\n    attachTo.setImmediate = setImmediate;\n    attachTo.clearImmediate = clearImmediate;\n}(typeof self === \"undefined\" ? typeof global === \"undefined\" ? this : global : self));\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\"), __webpack_require__(/*! ./../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack:///./node_modules/setimmediate/setImmediate.js?");

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== \"undefined\" && global) ||\n            (typeof self !== \"undefined\" && self) ||\n            window;\nvar apply = Function.prototype.apply;\n\n// DOM APIs, for completeness\n\nexports.setTimeout = function() {\n  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);\n};\nexports.setInterval = function() {\n  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);\n};\nexports.clearTimeout =\nexports.clearInterval = function(timeout) {\n  if (timeout) {\n    timeout.close();\n  }\n};\n\nfunction Timeout(id, clearFn) {\n  this._id = id;\n  this._clearFn = clearFn;\n}\nTimeout.prototype.unref = Timeout.prototype.ref = function() {};\nTimeout.prototype.close = function() {\n  this._clearFn.call(scope, this._id);\n};\n\n// Does not start the time, just sets up the members needed.\nexports.enroll = function(item, msecs) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = msecs;\n};\n\nexports.unenroll = function(item) {\n  clearTimeout(item._idleTimeoutId);\n  item._idleTimeout = -1;\n};\n\nexports._unrefActive = exports.active = function(item) {\n  clearTimeout(item._idleTimeoutId);\n\n  var msecs = item._idleTimeout;\n  if (msecs >= 0) {\n    item._idleTimeoutId = setTimeout(function onTimeout() {\n      if (item._onTimeout)\n        item._onTimeout();\n    }, msecs);\n  }\n};\n\n// setimmediate attaches itself to the global object\n__webpack_require__(/*! setimmediate */ \"./node_modules/setimmediate/setImmediate.js\");\n// On some exotic environments, it's not clear which object `setimmediate` was\n// able to install onto.  Search each possibility in the same order as the\n// `setimmediate` library.\nexports.setImmediate = (typeof self !== \"undefined\" && self.setImmediate) ||\n                       (typeof global !== \"undefined\" && global.setImmediate) ||\n                       (this && this.setImmediate);\nexports.clearImmediate = (typeof self !== \"undefined\" && self.clearImmediate) ||\n                         (typeof global !== \"undefined\" && global.clearImmediate) ||\n                         (this && this.clearImmediate);\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///./node_modules/timers-browserify/main.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || Function(\"return this\")() || (1, eval)(\"this\");\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ }),

/***/ "./shared/helper/lib.js":
/*!******************************!*\
  !*** ./shared/helper/lib.js ***!
  \******************************/
/*! exports provided: assetLink, link */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"assetLink\", function() { return assetLink; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"link\", function() { return link; });\nfunction assetLink(srcPath) {\n    let ASSET_DIR = '//huyhuy17.mysite/asset';\n    return ASSET_DIR + srcPath;\n}\n\nfunction link(text, href) {\n    return {\n        text: text,\n        href: href,\n    };\n}\n\n\n//# sourceURL=webpack:///./shared/helper/lib.js?");

/***/ })

/******/ });